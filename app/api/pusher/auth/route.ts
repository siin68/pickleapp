import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { pusherServer } from '@/lib/pusher';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.text();
    const params = new URLSearchParams(body);
    const socketId = params.get('socket_id');
    const channelName = params.get('channel_name');

    if (!socketId || !channelName) {
      return NextResponse.json(
        { error: 'Missing socket_id or channel_name' },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const userIdStr = String(userId);
    const userIdNum = typeof userId === 'string' ? parseInt(userId, 10) : userId;

    // Authorize private-user-{userId} channels
    if (channelName.startsWith('private-user-')) {
      const channelUserId = channelName.replace('private-user-', '');
      
      if (channelUserId !== userIdStr) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const auth = pusherServer.authorizeChannel(socketId, channelName);
      return NextResponse.json(auth);
    }

    // Authorize private-chat-{chatId} channels
    if (channelName.startsWith('private-chat-')) {
      const chatIdStr = channelName.replace('private-chat-', '');
      const chatId = parseInt(chatIdStr, 10);
      
      if (isNaN(chatId)) {
        return NextResponse.json({ error: 'Invalid chat ID' }, { status: 400 });
      }
      
      // Verify user is a participant in this chat
      const participant = await prisma.chatParticipant.findFirst({
        where: {
          chatId,
          userId: userIdNum,
          leftAt: null,
        },
      });

      if (!participant) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const auth = pusherServer.authorizeChannel(socketId, channelName);
      return NextResponse.json(auth);
    }

    // Authorize presence-event-{eventId} channels
    if (channelName.startsWith('presence-event-')) {
      const eventIdStr = channelName.replace('presence-event-', '');
      const eventId = parseInt(eventIdStr, 10);
      
      if (isNaN(eventId)) {
        return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
      }
      
      // Verify user is a participant in this event
      const participant = await prisma.eventParticipant.findFirst({
        where: {
          eventId,
          userId: userIdNum,
          status: 'JOINED',
        },
      });

      if (!participant) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      // For presence channels, include user info
      const presenceData = {
        user_id: userIdStr,
        user_info: {
          id: userIdStr,
          name: session.user.name,
          image: session.user.image,
        },
      };

      const auth = pusherServer.authorizeChannel(socketId, channelName, presenceData);
      return NextResponse.json(auth);
    }

    return NextResponse.json(
      { error: 'Invalid channel name' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Pusher auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
