import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ArrowLeft,
  Users,
  Clock,
  Award,
  BookOpen,
  MapPin,
  GraduationCap,
  CheckCircle2,
  Building2,
  Briefcase,
  Shield,
} from 'lucide-react';
import { getFacultyById } from '../data/faculties';

export function FacultyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const faculty = id ? getFacultyById(parseInt(id)) : undefined;
  const [activeTab, setActiveTab] = useState('overview');

  if (!faculty) {
    return <Navigate to="/faculties" replace />;
  }

  const IconComponent = faculty.icon;

  const getCompetitivenessColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Moderate': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate('/faculties')}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Faculties</span>
        </Button>

        {/* Header Section */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <IconComponent className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{faculty.name}</h1>
                    <p className="text-xl text-gray-600 mb-3">{faculty.arabicName}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-50 text-blue-900 border-blue-200">
                        {faculty.category}
                      </Badge>
                      <Badge className={getCompetitivenessColor(faculty.admissionCompetitiveness)}>
                        {faculty.admissionCompetitiveness} Competition
                      </Badge>
                      <Badge className="bg-gradient-to-r from-blue-900 to-emerald-600 text-white">
                        Rank #{faculty.popularityRank}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{faculty.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-lg font-semibold text-gray-900">{faculty.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-900" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Student Capacity</p>
                  <p className="text-lg font-semibold text-gray-900">{faculty.studentsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-purple-900" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Departments</p>
                  <p className="text-lg font-semibold text-gray-900">{faculty.departments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="flex flex-row w-full bg-white/90 backdrop-blur-sm rounded-xl p-1.5 shadow-lg border border-gray-200/50 gap-1">
            <TabsTrigger 
              value="overview" 
              className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out relative overflow-hidden
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-emerald-600 
                data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-900/30
                data-[state=active]:scale-105 data-[state=active]:hover:scale-110 data-[state=active]:hover:shadow-lg
                data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-blue-900 
                data-[state=inactive]:hover:bg-gradient-to-r data-[state=inactive]:hover:from-blue-50 data-[state=inactive]:hover:to-emerald-50
                data-[state=inactive]:hover:scale-[1.02] data-[state=inactive]:hover:shadow-md data-[state=inactive]:hover:border-blue-200
                data-[state=inactive]:border data-[state=inactive]:border-transparent
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/0 before:to-emerald-400/0 
                before:transition-all before:duration-300 data-[state=inactive]:hover:before:from-blue-400/10 data-[state=inactive]:hover:before:to-emerald-400/10"
            >
              <span className="relative z-10">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="departments" 
              className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out relative overflow-hidden
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-emerald-600 
                data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-900/30
                data-[state=active]:scale-105 data-[state=active]:hover:scale-110 data-[state=active]:hover:shadow-lg
                data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-blue-900 
                data-[state=inactive]:hover:bg-gradient-to-r data-[state=inactive]:hover:from-blue-50 data-[state=inactive]:hover:to-emerald-50
                data-[state=inactive]:hover:scale-[1.02] data-[state=inactive]:hover:shadow-md data-[state=inactive]:hover:border-blue-200
                data-[state=inactive]:border data-[state=inactive]:border-transparent
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/0 before:to-emerald-400/0 
                before:transition-all before:duration-300 data-[state=inactive]:hover:before:from-blue-400/10 data-[state=inactive]:hover:before:to-emerald-400/10"
            >
              <span className="relative z-10">Departments</span>
            </TabsTrigger>
            <TabsTrigger 
              value="universities" 
              className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out relative overflow-hidden
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-emerald-600 
                data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-900/30
                data-[state=active]:scale-105 data-[state=active]:hover:scale-110 data-[state=active]:hover:shadow-lg
                data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-blue-900 
                data-[state=inactive]:hover:bg-gradient-to-r data-[state=inactive]:hover:from-blue-50 data-[state=inactive]:hover:to-emerald-50
                data-[state=inactive]:hover:scale-[1.02] data-[state=inactive]:hover:shadow-md data-[state=inactive]:hover:border-blue-200
                data-[state=inactive]:border data-[state=inactive]:border-transparent
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/0 before:to-emerald-400/0 
                before:transition-all before:duration-300 data-[state=inactive]:hover:before:from-blue-400/10 data-[state=inactive]:hover:before:to-emerald-400/10"
            >
              <span className="relative z-10">Universities</span>
            </TabsTrigger>
            <TabsTrigger 
              value="careers" 
              className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out relative overflow-hidden
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-emerald-600 
                data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-900/30
                data-[state=active]:scale-105 data-[state=active]:hover:scale-110 data-[state=active]:hover:shadow-lg
                data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-blue-900 
                data-[state=inactive]:hover:bg-gradient-to-r data-[state=inactive]:hover:from-blue-50 data-[state=inactive]:hover:to-emerald-50
                data-[state=inactive]:hover:scale-[1.02] data-[state=inactive]:hover:shadow-md data-[state=inactive]:hover:border-blue-200
                data-[state=inactive]:border data-[state=inactive]:border-transparent
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/0 before:to-emerald-400/0 
                before:transition-all before:duration-300 data-[state=inactive]:hover:before:from-blue-400/10 data-[state=inactive]:hover:before:to-emerald-400/10"
            >
              <span className="relative z-10">Careers</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-900" />
                    Entry Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{faculty.entryRequirements}</p>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-gray-600 mb-2">Admission Competitiveness:</p>
                    <Badge className={getCompetitivenessColor(faculty.admissionCompetitiveness)}>
                      {faculty.admissionCompetitiveness}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-900" />
                    Accreditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {faculty.accreditation.map((acc, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-gray-700">{acc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="mt-6">
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-900" />
                  All Departments ({faculty.departments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {faculty.departments.map((dept, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">{dept}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Universities Tab */}
          <TabsContent value="universities" className="mt-6">
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-900" />
                  Available Universities ({faculty.universities.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {faculty.universities.map((uni, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors"
                    >
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-gray-900 font-medium">{uni}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers" className="mt-6">
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-900" />
                  Career Prospects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {faculty.careerProspects.map((career, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100 hover:border-emerald-300 transition-colors"
                    >
                      <Award className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">{career}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Info */}
        <Card className="shadow-md border-0 bg-gradient-to-r from-blue-900 to-emerald-600 text-white">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-4">Why Choose This Faculty?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Comprehensive Education</p>
                  <p className="text-blue-100 text-sm">
                    {faculty.description.substring(0, 100)}...
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Industry Recognition</p>
                  <p className="text-blue-100 text-sm">
                    Accredited by {faculty.accreditation.length} professional organizations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Wide Availability</p>
                  <p className="text-blue-100 text-sm">
                    Offered at {faculty.universities.length} leading universities across Egypt
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Career Opportunities</p>
                  <p className="text-blue-100 text-sm">
                    {faculty.careerProspects.length}+ diverse career paths available
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

