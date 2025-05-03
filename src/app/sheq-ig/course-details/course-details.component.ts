import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface CourseModule {
  title: string;
  duration: string;
  topics: string[];
  open: boolean;
}


@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {
  course = {
    title: 'Fundamentals of Chemical Handling',
    description: 'Join us to master the essential skills for safe and efficient chemical handling. Enroll now and enhance your expertise!',
    participants: 1234,
    imageUrl: 'assets/images/chemical-handling.jfif'
  };

  instructor = {
    name: 'Dr. Dwayne Walker',
    title: 'Senior Trainer at SHEQ Group International',
    bio: 'Dr. Walker is a renowned expert in chemical safety with over 15 years of experience in both industry and academia. His engaging teaching style combines practical insights with cutting-edge research, ensuring students gain both theoretical knowledge and hands-on skills.',
    imageUrl: 'assets/images/walker-dwayne-1467885475.jpg'
  };
  

  courseModules: CourseModule[] = [
    {
      title: 'Introduction to Safety Practices',
      duration: '2 hours',
      topics: [
        'Overview of chemical safety principles',
        'Importance of personal protective equipment (PPE)',
        'Basic risk assessment techniques'
      ],
      open: false
    },
    {
      title: 'Waste Management Protocols',
      duration: '2.5 hours',
      topics: [
        'Classification of chemical waste',
        'Proper disposal methods',
        'Environmental impact considerations'
      ],
      open: false
    },
    {
      title: 'On-site Hazard Management',
      duration: '3 hours',
      topics: [
        'Identifying potential hazards in the workplace',
        'Emergency response procedures',
        'Spill control and containment techniques'
      ],
      open: false
    },
  ];


  constructor() {
    // Initialize the course object with a dummy number of participants
    
  }

  ngOnInit(): void {
    // Any additional initialization logic can go here
  }

}
