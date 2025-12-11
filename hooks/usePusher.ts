import { useEffect, useState, useCallback } from 'react';
import Pusher, { Channel } from 'pusher-js';

// Singleton Pusher client
let pusherClient: Pusher | null = null;

function getPusherClient(): Pusher {
  if (!pusherClient) {
    pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1',
      authEndpoint: '/api/pusher/auth',
      auth: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    });

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      pusherClient.connection.bind('connected', () => {
        console.log('✅ Pusher connected');
      });
      pusherClient.connection.bind('error', (err: any) => {
        console.error('❌ Pusher error:', err);
      });
    }
  }
  return pusherClient;
}

export function usePusher() {
  const [pusher, setPusher] = useState<Pusher | null>(null);

  useEffect(() => {
    const client = getPusherClient();
    setPusher(client);
  }, []);

  return pusher;
}

// Hook for subscribing to a channel
export function usePusherChannel(channelName: string | null) {
  const pusher = usePusher();
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    if (!pusher || !channelName) return;

    const ch = pusher.subscribe(channelName);
    setChannel(ch);

    return () => {
      ch.unsubscribe();
    };
  }, [pusher, channelName]);

  return channel;
}

// Hook for listening to events on a channel
export function usePusherEvent<T = any>(
  channelName: string | null,
  eventName: string,
  callback: (data: T) => void
) {
  const channel = usePusherChannel(channelName);

  useEffect(() => {
    if (!channel) return;

    channel.bind(eventName, callback);

    return () => {
      channel.unbind(eventName, callback);
    };
  }, [channel, eventName, callback]);
}

// Hook for user-specific events
export function useUserEvents(userId: string | null) {
  const channelName = userId ? `private-user-${userId}` : null;
  const channel = usePusherChannel(channelName);

  const bindEvent = useCallback(
    (event: string, callback: (data: any) => void) => {
      if (!channel) return () => {};
      channel.bind(event, callback);
      return () => channel.unbind(event, callback);
    },
    [channel]
  );

  return { channel, bindEvent };
}

// Hook for chat events
export function useChatEvents(chatId: string | null) {
  const channelName = chatId ? `private-chat-${chatId}` : null;
  const channel = usePusherChannel(channelName);

  const bindEvent = useCallback(
    (event: string, callback: (data: any) => void) => {
      if (!channel) return () => {};
      channel.bind(event, callback);
      return () => channel.unbind(event, callback);
    },
    [channel]
  );

  return { channel, bindEvent };
}

// Hook for event (meetup) presence channel
export function useEventPresence(eventId: string | null) {
  const channelName = eventId ? `presence-event-${eventId}` : null;
  const pusher = usePusher();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    if (!pusher || !channelName) return;

    const ch = pusher.subscribe(channelName);
    setChannel(ch);

    // Presence channel events
    ch.bind('pusher:subscription_succeeded', (members: any) => {
      const membersList: any[] = [];
      members.each((member: any) => {
        membersList.push(member);
      });
      setMembers(membersList);
    });

    ch.bind('pusher:member_added', (member: any) => {
      setMembers(prev => [...prev, member]);
    });

    ch.bind('pusher:member_removed', (member: any) => {
      setMembers(prev => prev.filter(m => m.id !== member.id));
    });

    return () => {
      ch.unsubscribe();
    };
  }, [pusher, channelName]);

  const bindEvent = useCallback(
    (event: string, callback: (data: any) => void) => {
      if (!channel) return () => {};
      channel.bind(event, callback);
      return () => channel.unbind(event, callback);
    },
    [channel]
  );

  return { channel, members, bindEvent };
}
