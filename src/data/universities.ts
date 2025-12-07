export interface University {
  id: number;
  name: string;
  arabicName: string;
  city: string;
  type: 'Public' | 'Private';
  founded: number;
  students: string;
  ranking: number;
  image: string;
  programs: string[];
  tuitionRange: string;
  rating: number;
  description: string;
}

export const universities: University[] = [
  {
    id: 1,
    name: 'Cairo University',
    arabicName: 'جامعة القاهرة',
    city: 'Cairo',
    type: 'Public',
    founded: 1908,
    students: '155,000+',
    ranking: 1,
    image: 'https://img.youm7.com/ArticleImgs/2024/8/5/244087-%D9%82%D8%A8%D8%A9.jpg',
    programs: ['Medicine', 'Engineering', 'Law', 'Business', 'Arts'],
    tuitionRange: 'EGP 1,500 - 15,000',
    rating: 4.8,
    description: 'Egypt\'s premier university, renowned for academic excellence and research innovation.'
  },
  {
    id: 2,
    name: 'American University in Cairo',
    arabicName: 'الجامعة الأمريكية بالقاهرة',
    city: 'Cairo',
    type: 'Private',
    founded: 1919,
    students: '7,000+',
    ranking: 2,
    image: 'https://theigclub.com/wp-content/uploads/elementor/thumbs/138529499_10159073446255295_5222111569372919742_n-pt2koewkqz4gbfzb9qexbotsi9olkdlglqnu743z4w.jpg',
    programs: ['Business', 'Engineering', 'Computer Science', 'Political Science', 'Psychology'],
    tuitionRange: 'USD 15,000 - 25,000',
    rating: 4.7,
    description: 'Leading liberal arts university offering American-style education in Egypt.'
  },
  {
    id: 3,
    name: 'Alexandria University',
    arabicName: 'جامعة الإسكندرية',
    city: 'Alexandria',
    type: 'Public',
    founded: 1942,
    students: '180,000+',
    ranking: 3,
    image: 'https://alexu.edu.eg/images/ahmedgaber/my_university.jpg',
    programs: ['Medicine', 'Engineering', 'Agriculture', 'Pharmacy', 'Science'],
    tuitionRange: 'EGP 1,200 - 12,000',
    rating: 4.6,
    description: 'Historic university known for medical and engineering programs with Mediterranean campus.'
  },
  {
    id: 4,
    name: 'Ain Shams University',
    arabicName: 'جامعة عين شمس',
    city: 'Cairo',
    type: 'Public',
    founded: 1950,
    students: '200,000+',
    ranking: 4,
    image: 'https://scenenow.com/Content/Admin/Uploads/Articles/ArticlesMainPhoto/42796/36a16404-69c2-4ebd-b4ad-80245e29027d.jpg',
    programs: ['Medicine', 'Engineering', 'Commerce', 'Education', 'Computer Science'],
    tuitionRange: 'EGP 1,800 - 18,000',
    rating: 4.5,
    description: 'Comprehensive university with strong research focus and diverse academic programs.'
  },
  {
    id: 5,
    name: 'German University in Cairo',
    arabicName: 'الجامعة الألمانية بالقاهرة',
    city: 'Cairo',
    type: 'Private',
    founded: 2003,
    students: '12,000+',
    ranking: 5,
    image: 'https://www.guc.edu.eg//img/content/about_guc/48.jpg',
    programs: ['Engineering', 'Management', 'Information Technology', 'Applied Sciences'],
    tuitionRange: 'EUR 4,000 - 8,000',
    rating: 4.6,
    description: 'German-Egyptian partnership offering European-standard education and research.'
  },
  {
    id: 6,
    name: 'Mansoura University',
    arabicName: 'جامعة المنصورة',
    city: 'Mansoura',
    type: 'Public',
    founded: 1972,
    students: '140,000+',
    ranking: 6,
    image: 'https://oktamam.com/wp-content/uploads/2024/03/mansoura-university-campus.jpg',
    programs: ['Medicine', 'Engineering', 'Science', 'Agriculture', 'Veterinary Medicine'],
    tuitionRange: 'EGP 1,400 - 14,000',
    rating: 4.4,
    description: 'Leading regional university with excellent medical and engineering faculties.'
  }
];

export function getUniversityById(id: number): University | undefined {
  return universities.find(uni => uni.id === id);
}

