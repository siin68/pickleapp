'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, Badge, Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
import { MOCK_EVENTS } from '@/mock-data';
import { getLocationById, getHobbyById, getUserById } from '@/lib/data';

export default function LocationPage() {
  const params = useParams();
  const router = useRouter();
  
  const location = getLocationById(params.id as string);
  if (!location) return <div>Location not found</div>;

  const eventsAtLocation = MOCK_EVENTS.filter(
    (e) => e.locationId === params.id && e.status === 'open'
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent mb-2">
          📍 {location.name}
        </h1>
        <p className="text-gray-600 mb-6">{location.city}</p>

        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          Events at this location ({eventsAtLocation.length})
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsAtLocation.map((event) => {
            const hobby = getHobbyById(event.hobbyId);
            const spotsLeft = event.maxParticipants - event.currentParticipants.length;
            const host = getUserById?.(event.hostId);
            return (
              <Card
                key={event.id}
                onClick={() => router.push(`/event/${event.id}`)}
                className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-transparent hover:border-primary-200 overflow-hidden"
              >
                <div className="h-24 bg-gradient-to-br from-primary-400 via-primary-500 to-accent-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-primary-700 hover:bg-white">
                      {spotsLeft} spots
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="text-3xl opacity-80">{hobby?.icon}</div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition text-lg mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>🎯</span>
                      <span className="font-medium">{hobby?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>📅</span>
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Avatar className="w-6 h-6 border-2 border-white">
                        <AvatarImage src={host?.image || ''} alt={host?.name || ''} />
                        <AvatarFallback>{host?.name?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">Host: {host?.name}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-300 to-accent-300 border-2 border-white"></div>
                      ))}
                      <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                        +{Math.max(0, event.currentParticipants.length - 3)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{event.currentParticipants.length} attending</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {eventsAtLocation.length === 0 && (
          <Card className="border-2 border-dashed border-gray-200 mt-8">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">No open events at this location</h3>
                <p className="text-gray-500 mb-6">Be the first to create an event here!</p>
                <Button onClick={() => {}} disabled>
                  Create Event
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
