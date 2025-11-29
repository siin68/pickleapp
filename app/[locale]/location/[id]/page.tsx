'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, Badge } from '@/components/ui';
import { MOCK_EVENTS } from '@/mock-data';
import { getLocationById, getHobbyById } from '@/lib/data';

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
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">
          📍 {location.name}
        </h1>
        <p className="text-gray-600 mb-6">{location.city}</p>

        <h2 className="text-xl font-bold mb-4">
          Events at this location ({eventsAtLocation.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eventsAtLocation.map((event) => {
            const hobby = getHobbyById(event.hobbyId);
            const spotsLeft = event.maxParticipants - event.currentParticipants.length;

            return (
              <Card
                key={event.id}
                onClick={() => router.push(`/event/${event.id}`)}
                className="cursor-pointer hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <Badge variant={spotsLeft > 3 ? 'success' : 'warning'}>
                    {spotsLeft} spots
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>{hobby?.icon}</span>
                    <span>{hobby?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>
                      {event.date} at {event.time}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {eventsAtLocation.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No open events at this location
          </div>
        )}
      </div>
    </div>
  );
}
