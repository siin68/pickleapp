"use client";

import { useEffect, useCallback } from 'react';
import { usePusherContext } from '@/contexts/SocketContext';
import { useSession } from 'next-auth/react';
import Pusher, { Channel } from 'pusher-js';

/**
 * Hook to get the Pusher instance and subscribe to user's private channel
 */
export const useSocketUser = () => {
  const { pusher, isConnected } = usePusherContext();
  const { data: session } = useSession();

  useEffect(() => {
    if (pusher && isConnected && session?.user?.id) {
      const channelName = `private-user-${session.user.id}`;
      // Subscribe to user channel (SocketListener handles this globally)
      pusher.subscribe(channelName);
      console.log(`👤 Subscribed to user channel: ${channelName}`);
    }
  }, [pusher, isConnected, session?.user?.id]);

  return { pusher, isConnected };
};

/**
 * Hook to subscribe to an event's presence channel
 */
export const useSocketEvent = (eventId: string | null) => {
  const { pusher, isConnected } = usePusherContext();

  useEffect(() => {
    if (pusher && isConnected && eventId) {
      const channelName = `presence-event-${eventId}`;
      const channel = pusher.subscribe(channelName);
      console.log(`📅 Subscribed to event channel: ${channelName}`);

      return () => {
        pusher.unsubscribe(channelName);
        console.log(`👋 Unsubscribed from event channel: ${channelName}`);
      };
    }
  }, [pusher, isConnected, eventId]);

  return { pusher, isConnected };
};

/**
 * Hook to subscribe to a chat's private channel
 */
export const useSocketChat = (chatId: string | null) => {
  const { pusher, isConnected } = usePusherContext();

  useEffect(() => {
    if (pusher && isConnected && chatId) {
      const channelName = `private-chat-${chatId}`;
      pusher.subscribe(channelName);
      console.log(`💬 Subscribed to chat channel: ${channelName}`);

      return () => {
        pusher.unsubscribe(channelName);
        console.log(`👋 Unsubscribed from chat channel: ${channelName}`);
      };
    }
  }, [pusher, isConnected, chatId]);

  return { pusher, isConnected };
};

/**
 * Hook to listen for new messages in a chat
 */
export const useSocketMessages = (
  chatId: string | null,
  onMessage: (message: any) => void
) => {
  const { pusher, isConnected } = usePusherContext();

  useEffect(() => {
    if (!pusher || !isConnected || !chatId) return;

    const channelName = `private-chat-${chatId}`;
    const channel = pusher.subscribe(channelName);
    
    channel.bind('new-message', onMessage);

    return () => {
      channel.unbind('new-message', onMessage);
      // Don't unsubscribe - let useSocketChat manage that
    };
  }, [pusher, isConnected, chatId, onMessage]);

  return { pusher, isConnected };
};

/**
 * Hook to listen for typing indicators
 */
export const useSocketTyping = (
  chatId: string | null,
  onTyping: (data: { userId: string; isTyping: boolean }) => void
) => {
  const { pusher, isConnected } = usePusherContext();

  useEffect(() => {
    if (!pusher || !isConnected || !chatId) return;

    const channelName = `private-chat-${chatId}`;
    const channel = pusher.subscribe(channelName);
    
    channel.bind('user-typing', onTyping);

    return () => {
      channel.unbind('user-typing', onTyping);
    };
  }, [pusher, isConnected, chatId, onTyping]);

  // For Pusher, typing is triggered via API, not client events
  const sendTyping = useCallback(async (userId: string, isTyping: boolean) => {
    if (chatId) {
      try {
        await fetch('/api/chats/typing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatId, userId, isTyping }),
        });
      } catch (error) {
        console.error('Failed to send typing indicator:', error);
      }
    }
  }, [chatId]);

  return { sendTyping, pusher, isConnected };
};

/**
 * Hook to listen for notifications
 */
export const useSocketNotifications = (
  onNotification: (notification: any) => void
) => {
  const { pusher, isConnected } = useSocketUser();
  const { data: session } = useSession();

  useEffect(() => {
    if (!pusher || !isConnected || !session?.user?.id) return;

    const channelName = `private-user-${session.user.id}`;
    const channel = pusher.subscribe(channelName);
    
    channel.bind('notification', onNotification);

    return () => {
      channel.unbind('notification', onNotification);
    };
  }, [pusher, isConnected, session?.user?.id, onNotification]);

  return { pusher, isConnected };
};
