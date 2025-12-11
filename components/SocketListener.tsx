"use client";

import { useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { usePusherContext } from '@/contexts/SocketContext';

export default function SocketListener() {
  const { data: session } = useSession();
  const { pusher, isConnected } = usePusherContext();

  // Subscribe to user's private channel when connected
  useEffect(() => {
    if (!pusher || !isConnected || !session?.user?.id) {
      return;
    }

    const userId = String(session.user.id);
    const channelName = `private-user-${userId}`;
    
    // Subscribe to user's private channel
    const channel = pusher.subscribe(channelName);

    // Event handlers that dispatch to window for other components to listen
    const handleNotification = (data: any) => {
      window.dispatchEvent(new CustomEvent('socket-notification', { detail: data }));
    };

    const handleEventJoined = (data: any) => {
      window.dispatchEvent(new CustomEvent('event-joined', { detail: data }));
    };

    const handleEventLeft = (data: any) => {
      window.dispatchEvent(new CustomEvent('event-left', { detail: data }));
    };

    const handleFriendRequestReceived = (data: any) => {
      window.dispatchEvent(new CustomEvent('friend-request-received', { detail: data }));
    };

    const handleFriendRequestAccepted = (data: any) => {
      window.dispatchEvent(new CustomEvent('friend-request-accepted', { detail: data }));
    };

    const handleChatMemberJoined = (data: any) => {
      window.dispatchEvent(new CustomEvent('chat-member-joined', { detail: data }));
    };

    const handleChatMemberLeft = (data: any) => {
      window.dispatchEvent(new CustomEvent('chat-member-left', { detail: data }));
    };

    const handleNewMessage = (data: any) => {
      window.dispatchEvent(new CustomEvent('new-message', { detail: data }));
    };

    const handleEventJoinRequest = (data: any) => {
      window.dispatchEvent(new CustomEvent('event-join-request', { detail: data }));
    };

    const handleEventRequestAccepted = (data: any) => {
      window.dispatchEvent(new CustomEvent('event-request-accepted', { detail: data }));
    };

    const handleEventRequestRejected = (data: any) => {
      window.dispatchEvent(new CustomEvent('event-request-rejected', { detail: data }));
    };

    const handleNewLike = (data: { message: string; likerName: string; likerImage?: string; likerId: number }) => {
      window.dispatchEvent(new CustomEvent('new-like', { detail: data }));
    };

    const handleMatchFound = (data: { message: string; matchedUserId: number; matchedUserName: string; matchedUserImage?: string }) => {
      window.dispatchEvent(new CustomEvent('match-found', { detail: data }));
    };

    // Bind all event handlers to the channel
    channel.bind('notification', handleNotification);
    channel.bind('event-joined', handleEventJoined);
    channel.bind('event-left', handleEventLeft);
    channel.bind('friend-request-received', handleFriendRequestReceived);
    channel.bind('friend-request-accepted', handleFriendRequestAccepted);
    channel.bind('chat-member-joined', handleChatMemberJoined);
    channel.bind('chat-member-left', handleChatMemberLeft);
    channel.bind('new-message', handleNewMessage);
    channel.bind('event-join-request', handleEventJoinRequest);
    channel.bind('event-request-accepted', handleEventRequestAccepted);
    channel.bind('event-request-rejected', handleEventRequestRejected);
    channel.bind('new-like', handleNewLike);
    channel.bind('match-found', handleMatchFound);

    // Cleanup: unbind all handlers and unsubscribe
    return () => {
      channel.unbind('notification', handleNotification);
      channel.unbind('event-joined', handleEventJoined);
      channel.unbind('event-left', handleEventLeft);
      channel.unbind('friend-request-received', handleFriendRequestReceived);
      channel.unbind('friend-request-accepted', handleFriendRequestAccepted);
      channel.unbind('chat-member-joined', handleChatMemberJoined);
      channel.unbind('chat-member-left', handleChatMemberLeft);
      channel.unbind('new-message', handleNewMessage);
      channel.unbind('event-join-request', handleEventJoinRequest);
      channel.unbind('event-request-accepted', handleEventRequestAccepted);
      channel.unbind('event-request-rejected', handleEventRequestRejected);
      channel.unbind('new-like', handleNewLike);
      channel.unbind('match-found', handleMatchFound);
      pusher.unsubscribe(channelName);
    };
  }, [pusher, isConnected, session?.user?.id]);

  return null;
}
