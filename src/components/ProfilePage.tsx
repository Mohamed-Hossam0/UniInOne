import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Heart,
  Star,
  BookOpen,
  Edit,
} from 'lucide-react';

interface ProfilePageProps {
  user: {
    name: string;
    email: string;
    role: 'student' | 'admin';
  };
}

export function ProfilePage({ user }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || 'Student Name');
  const [phone, setPhone] = useState('+20 123 456 7890');
  const [location, setLocation] = useState('Cairo, Egypt');
  const [bio, setBio] = useState('Aspiring computer science student looking for the best university program.');

  const favoriteUniversities = [
    { name: 'Cairo University', program: 'Computer Science', status: 'Interested' },
    { name: 'American University in Cairo', program: 'Engineering', status: 'Applied' },
    { name: 'Ain Shams University', program: 'Medicine', status: 'Considering' },
  ];

  const comparedUniversities = [
    { name: 'Cairo University vs AUC', date: 'March 1, 2025' },
    { name: 'Ain Shams vs Alexandria University', date: 'February 28, 2025' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start md:items-center gap-6 flex-col md:flex-row w-full md:w-auto">
                <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                  <AvatarImage src="" alt={name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-900 to-emerald-600 text-white text-2xl">
                    {name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl text-gray-900">{name}</h1>
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                      {user.role === 'admin' ? 'Admin' : 'Student'}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? 'default' : 'outline'}
                className="w-full md:w-auto"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm shadow-sm border-0">
            <TabsTrigger value="info" className="gap-2">
              <User className="h-4 w-4" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="info">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <h2 className="text-2xl text-gray-900 mb-6">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <h2 className="text-2xl text-gray-900 mb-6">Favorite Universities</h2>
                <div className="space-y-4">
                  {favoriteUniversities.map((uni, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <GraduationCap className="h-5 w-5 text-blue-900" />
                            <h3 className="text-lg text-gray-900">{uni.name}</h3>
                          </div>
                          <p className="text-gray-600 mb-2">{uni.program}</p>
                          <Badge variant="outline" className="bg-white">
                            {uni.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Heart className="h-5 w-5 fill-current" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <h2 className="text-2xl text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-emerald-600" />
                      Comparison History
                    </h3>
                    <div className="space-y-3">
                      {comparedUniversities.map((comparison, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-gray-900">{comparison.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4" />
                              {comparison.date}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
