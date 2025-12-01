'use client';

import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Card, CardContent, Button, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { getUserById, getHobbyById, getLocationById, getEventsByUserId } from '@/lib/data';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('profile');
  
  const user = getUserById(params.id as string);
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <p className="text-gray-500">User not found</p>
          <Button onClick={() => router.push(`/dashboard`)} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const userEvents = getEventsByUserId(user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          ← Back
        </Button>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-4">
                {user.age} years • {user.gender}
              </p>
              <p className="text-gray-700 mb-6">{user.bio}</p>
              <Button onClick={() => alert('Message functionality will be implemented')}>
                {t('sendMessage')}
              </Button>
            </div>
          </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            {t('hobbies')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.hobbies.map((hobbyId) => {
              const hobby = getHobbyById(hobbyId);
              return (
                <span key={hobbyId} className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700">
                  {hobby?.icon} {hobby?.name}
                </span>
              );
            })}
          </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            {t('locations')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.preferredLocations.map((locationId) => {
              const location = getLocationById(locationId);
              return (
                <span key={locationId} className="px-4 py-2 rounded-full text-sm font-semibold bg-pink-50 text-primary-700">
                  {location?.name}
                </span>
              );
            })}
          </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            {t('events')}
          </h2>
          {userEvents.length > 0 ? (
            <div className="space-y-3">
              {userEvents.map((event) => {
                const hobby = getHobbyById(event.hobbyId);
                const location = getLocationById(event.locationId);
                return (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl cursor-pointer transition group bg-white/60 backdrop-blur hover:shadow-md border border-pink-100 hover:border-primary-300"
                    onClick={() => router.push(`/event/${event.id}`)}
                  >
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition">
                      {event.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded-md bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700">
                        {hobby?.icon} {hobby?.name}
                      </span>
                      <span className="px-2 py-1 rounded-md bg-pink-50 text-primary-700">
                        {location?.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {event.date} • {event.time}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No events yet</p>
          )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
