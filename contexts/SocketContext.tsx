"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import Pusher from 'pusher-js';

interface PusherContextType {
  pusher: Pusher | null;
  isConnected: boolean;
}

const PusherContext = createContext<PusherContextType>({
  pusher: null,
  isConnected: false,
});

export const usePusherContext = () => {
  const context = useContext(PusherContext);
  if (!context) {
    throw new Error('usePusherContext must be used within PusherProvider');
  }
  return context;
};

interface PusherProviderProps {
  children: ReactNode;
}

let globalPusher: Pusher | null = null;

export const PusherProvider = ({ children }: PusherProviderProps) => {
  const [pusher, setPusher] = useState<Pusher | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    // Return early if already initialized
    if (initialized.current && globalPusher) {
      setPusher(globalPusher);
      setIsConnected(globalPusher.connection.state === 'connected');
      return;
    }
    initialized.current = true;

    // Disconnect existing instance if any
    if (globalPusher) {
      globalPusher.disconnect();
      globalPusher = null;
    }

    // Create new Pusher instance
    const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1',
      authEndpoint: '/api/pusher/auth',
      auth: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    });

    // Connection event handlers
    pusherInstance.connection.bind('connected', () => {
      console.log('✅ Pusher connected');
      setIsConnected(true);
    });

    pusherInstance.connection.bind('disconnected', () => {
      console.log('❌ Pusher disconnected');
      setIsConnected(false);
    });

    pusherInstance.connection.bind('error', (err: any) => {
      console.error('❌ Pusher error:', err);
      setIsConnected(false);
    });

    pusherInstance.connection.bind('state_change', (states: any) => {
      console.log('Pusher state changed:', states.previous, '→', states.current);
    });

    globalPusher = pusherInstance;
    setPusher(pusherInstance);

    // Cleanup on unmount
    return () => {
      // Don't disconnect on unmount to keep connection alive across page navigations
      // pusherInstance.disconnect();
    };
  }, []);

  return (
    <PusherContext.Provider value={{ pusher, isConnected }}>
      {children}
    </PusherContext.Provider>
  );
};

// Backward compatibility: export as SocketProvider and useSocket
export const SocketProvider = PusherProvider;
export const useSocket = () => {
  const { pusher, isConnected } = usePusherContext();
  return { socket: pusher, isConnected };
};
