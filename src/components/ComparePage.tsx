import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  GraduationCap,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  Star,
  X,
  Plus,
  Check,
  Building2,
} from 'lucide-react';

interface University {
  id: number;
  name: string;
  city: string;
  type: 'Public' | 'Private';
  founded: number;
  students: string;
  tuitionRange: string;
  ranking: number;
  rating: number;
  programs: string[];
}

export function ComparePage() {
  const [selectedUniversities, setSelectedUniversities] = useState<(University | null)[]>([
    null,
    null,
  ]);

  const universities: University[] = [
    {
      id: 1,
      name: 'Cairo University',
      city: 'Cairo',
      type: 'Public',
      founded: 1908,
      students: '155,000',
      tuitionRange: 'EGP 1,500 - 5,000/year',
      ranking: 1,
      rating: 4.5,
      programs: ['Medicine', 'Engineering', 'Law', 'Economics'],
    },
    {
      id: 2,
      name: 'American University in Cairo',
      city: 'Cairo',
      type: 'Private',
      founded: 1919,
      students: '6,500',
      tuitionRange: '$15,000 - $25,000/year',
      ranking: 2,
      rating: 4.8,
      programs: ['Business', 'Engineering', 'Liberal Arts', 'Sciences'],
    },
    {
      id: 3,
      name: 'Ain Shams University',
      city: 'Cairo',
      type: 'Public',
      founded: 1950,
      students: '180,000',
      tuitionRange: 'EGP 1,500 - 5,000/year',
      ranking: 3,
      rating: 4.3,
      programs: ['Medicine', 'Pharmacy', 'Engineering', 'Arts'],
    },
    {
      id: 4,
      name: 'Alexandria University',
      city: 'Alexandria',
      type: 'Public',
      founded: 1942,
      students: '150,000',
      tuitionRange: 'EGP 1,500 - 5,000/year',
      ranking: 4,
      rating: 4.4,
      programs: ['Medicine', 'Engineering', 'Agriculture', 'Pharmacy'],
    },
  ];

  const handleSelectUniversity = (university: University, index: number) => {
    const newSelected = [...selectedUniversities];
    newSelected[index] = university;
    setSelectedUniversities(newSelected);
  };

  const handleRemoveUniversity = (index: number) => {
    const newSelected = [...selectedUniversities];
    newSelected[index] = null;
    setSelectedUniversities(newSelected);
  };

  const availableUniversities = universities.filter(
    (uni) => !selectedUniversities.some((selected: University | null) => selected?.id === uni.id)
  );

  const ComparisonMetric = ({
    icon: Icon,
    label,
    values,
  }: {
    icon: any;
    label: string;
    values: (string | number)[];
  }) => (
    <div className="border-b border-border last:border-b-0 py-4">
      <div className="flex items-center gap-2 mb-3 text-muted-foreground">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {values.map((value, index) => (
          <div key={index} className="text-center">
            <p className="text-foreground">{value || '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Compare Universities</h1>
        <p className="text-muted-foreground">Compare two universities side by side to make the best decision for your future</p>
      </div>
        {/* University Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {selectedUniversities.map((university: University | null, index: number) => (
            <Card
              key={index}
              className="p-6 shadow-sm border border-border bg-card dark:bg-gray-800/50"
            >
              {university ? (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 to-emerald-600 flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700">
                          #{university.ranking}
                        </Badge>
                      </div>
                      <h3 className="text-lg text-foreground mb-1">{university.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{university.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {university.city}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveUniversity(index)}
                      className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">Select a university</p>
                  <Select
                    onValueChange={(value: string) => {
                      const uni = universities.find((u) => u.id.toString() === value);
                      if (uni) handleSelectUniversity(uni, index);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUniversities.map((uni) => (
                        <SelectItem key={uni.id} value={uni.id.toString()}>
                          {uni.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </Card>
          ))}
        </motion.div>

        {/* Comparison Table */}
        {selectedUniversities.some((uni: University | null) => uni !== null) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-8 shadow-sm border border-border bg-card dark:bg-gray-800/50">
              <h2 className="text-2xl text-foreground mb-6">Detailed Comparison</h2>

              <div className="space-y-0">
                <ComparisonMetric
                  icon={Building2}
                  label="Type"
                  values={selectedUniversities.map((uni: University | null) => uni?.type || '')}
                />
                <ComparisonMetric
                  icon={Calendar}
                  label="Founded"
                  values={selectedUniversities.map((uni: University | null) => uni?.founded || '')}
                />
                <ComparisonMetric
                  icon={Users}
                  label="Student Body"
                  values={selectedUniversities.map((uni: University | null) => uni?.students || '')}
                />
                <ComparisonMetric
                  icon={DollarSign}
                  label="Tuition Range"
                  values={selectedUniversities.map((uni: University | null) => uni?.tuitionRange || '')}
                />
                <ComparisonMetric
                  icon={Star}
                  label="Rating"
                  values={selectedUniversities.map((uni: University | null) =>
                    uni ? `${uni.rating}/5.0` : ''
                  )}
                />
              </div>

              {/* Programs Comparison */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg text-foreground mb-4">Popular Programs</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedUniversities.map((uni: University | null, index: number) => (
                    <div key={index}>
                      {uni ? (
                        <div className="space-y-2">
                          {uni.programs.slice(0, 4).map((program: string, pIndex: number) => (
                            <div
                              key={pIndex}
                              className="flex items-center gap-2 text-sm text-foreground"
                            >
                              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              {program}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">-</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {!selectedUniversities.some((uni: University | null) => uni !== null) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-12 text-center shadow-sm border border-border bg-card dark:bg-gray-800/50">
              <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl text-foreground mb-2">No Universities Selected</h3>
              <p className="text-muted-foreground">
                Select universities from the dropdowns above to start comparing
              </p>
            </Card>
          </motion.div>
        )}
    </div>
  );
}

