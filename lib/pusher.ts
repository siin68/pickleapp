import Pusher from 'pusher';

// Validate required environment variables
const PUSHER_APP_ID = process.env.NEXT_PUBLIC_PUSHER_APP_ID;
const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY;
const PUSHER_SECRET = process.env.NEXT_PUBLIC_PUSHER_SECRET;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap1";

// Singleton instance
let pusherInstance: Pusher | null = null;

export function getPusherServer(): Pusher {
  if (!pusherInstance) {
    // Validate environment variables
    if (!PUSHER_APP_ID || !PUSHER_KEY || !PUSHER_SECRET) {
      console.error('[Pusher] Missing required environment variables:');
      if (!PUSHER_APP_ID) console.error('  - PUSHER_APP_ID is not set');
      if (!PUSHER_KEY) console.error('  - PUSHER_KEY is not set');
      if (!PUSHER_SECRET) console.error('  - PUSHER_SECRET is not set');
      throw new Error('Pusher configuration is incomplete. Please set PUSHER_APP_ID, PUSHER_KEY, and PUSHER_SECRET environment variables.');
    }

    pusherInstance = new Pusher({
      appId: PUSHER_APP_ID,
      key: PUSHER_KEY,
      secret: PUSHER_SECRET,
      cluster: PUSHER_CLUSTER,
      useTLS: true,
    });
  }
  return pusherInstance;
}

// Lazy initialization to avoid errors at import time
let _pusherServer: Pusher | null = null;
export const pusherServer = {
  get instance(): Pusher {
    if (!_pusherServer) {
      _pusherServer = getPusherServer();
    }
    return _pusherServer;
  },
  trigger: (...args: Parameters<Pusher['trigger']>) => {
    return pusherServer.instance.trigger(...args);
  },
  triggerBatch: (...args: Parameters<Pusher['triggerBatch']>) => {
    return pusherServer.instance.triggerBatch(...args);
  },
  authorizeChannel: (...args: Parameters<Pusher['authorizeChannel']>) => {
    return pusherServer.instance.authorizeChannel(...args);
  },
};

// Helper functions for common operations
export async function triggerUserEvent(userId: string, event: string, data: any) {
  return pusherServer.trigger(`private-user-${userId}`, event, data);
}

export async function triggerChatEvent(chatId: string, event: string, data: any) {
  return pusherServer.trigger(`private-chat-${chatId}`, event, data);
}

export async function triggerEventChannel(eventId: string, event: string, data: any) {
  return pusherServer.trigger(`presence-event-${eventId}`, event, data);
}

// Batch trigger for multiple users
export async function triggerMultipleUsers(userIds: string[], event: string, data: any) {
  const channels = userIds.map(id => `private-user-${id}`);
  return pusherServer.triggerBatch(
    channels.map(channel => ({
      channel,
      name: event,
      data,
    }))
  );
}

// ============================================
// Socket.IO Compatibility Layer
// ============================================
// These functions match the old socketEmit API for easy migration

export const socketEmit = {
  toUser: (userId: string, event: string, data: any) => {
    return pusherServer.trigger(`private-user-${userId}`, event, data).catch(err => {
      console.error(`[Pusher] Error emitting to user ${userId}:`, err);
    });
  },
  
  toChat: (chatId: string, event: string, data: any) => {
    return pusherServer.trigger(`private-chat-${chatId}`, event, data).catch(err => {
      console.error(`[Pusher] Error emitting to chat ${chatId}:`, err);
    });
  },
  
  toEvent: (eventId: string, event: string, data: any) => {
    return pusherServer.trigger(`presence-event-${eventId}`, event, data).catch(err => {
      console.error(`[Pusher] Error emitting to event ${eventId}:`, err);
    });
  },
  
  broadcast: (channel: string, event: string, data: any) => {
    return pusherServer.trigger(channel, event, data).catch(err => {
      console.error(`[Pusher] Error broadcasting to ${channel}:`, err);
    });
  },
};
