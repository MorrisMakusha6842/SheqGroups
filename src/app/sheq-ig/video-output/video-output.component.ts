import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerComponent } from '../player/player.component';

interface Course {
  id: number;
  title: string;
  instructor: string;
  imageUrl: string;
  rating: number;
  price: number;
  participants: number;
}

interface Section {
  id: number;
  title: string;
  modules: Module[];
  isExpanded: boolean;
}

interface Module {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
}

interface Tab {
  id: string;
  name: string;
}


@Component({
  selector: 'app-video-output',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule here
    RouterModule,
    PlayerComponent
  ],
  templateUrl: './video-output.component.html',
  styleUrl: './video-output.component.scss'
})
export class VideoOutputComponent implements OnInit {
  @ViewChild('Player') videoPlayer!: ElementRef<HTMLVideoElement>;

  courseId: number | null = null;
  course: Course | null = null;
  activeTab: string = 'training';
  tabs: Tab[] = [
    { id: 'training', name: 'Training Content' },
    { id: 'resources', name: 'Resources' },
    { id: 'support', name: 'Support' },
    { id: 'notes', name: 'Notes' }
  ];

  // Properties for Support Tab
  faqs = [
    { question: 'How do I reset my password?', answer: 'You can reset your password via the login page using the "Forgot Password" link.', open: false },
    { question: 'Where can I find the course materials?', answer: 'Course materials are available under the "Resources" tab.', open: false },
    { question: 'Who do I contact for technical issues?', answer: 'Please use the support request form below or contact support@example.com.', open: false }
  ];
  supportRequest = { name: '', email: '', subject: '', message: '' };

  // Properties for Notes Tab
  notes: { id: number, content: string, timestamp: Date, moduleId: number | null }[] = [];
  newNoteContent: string = '';
  editingNoteId: number | null = null;

  onModuleSelected(event: { section: string; module: string }): void {
    console.log('Selected module:', event);
    // Handle module selection
  }
  sections: Section[] = [
    {
      id: 1,
      title: 'Section 1: Introduction',
      isExpanded: false,
      modules: [
        { id: 1, title: 'Module 1: Introduction to Pure Mathematics', duration: '15:00', isCompleted: true },
        { id: 2, title: 'Module 2: Basic Concepts and Definitions', duration: '20:00', isCompleted: true },
        { id: 3, title: 'Module 3: Fundamental Principles', duration: '25:00', isCompleted: false }
      ]
    },
    {
      id: 2,
      title: 'Section 2: Core Concepts',
      isExpanded: false,
      modules: [
        { id: 4, title: 'Module 4: Advanced Topics', duration: '30:00', isCompleted: false },
        { id: 5, title: 'Module 5: Practical Applications', duration: '35:00', isCompleted: false }
      ]
    },
    {
      id: 3,
      title: 'Section 3: Advanced Topics',
      isExpanded: false,
      modules: [
        { id: 6, title: 'Module 6: Complex Theories', duration: '40:00', isCompleted: false },
        { id: 7, title: 'Module 7: Case Studies', duration: '45:00', isCompleted: false }
      ]
    }
  ];

  // Video player state
  isExtended: boolean = false;
  currentVideoUrl: string = 'assets/videos/sample.mp4';
  currentModuleIndex: number = 0;
  currentSectionIndex: number = 0;
  videoProgress: number = 0;
  selectedSectionId: number | null = null;
  selectedModuleId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    // For testing, populate with dummy data
    this.course = {
      id: this.courseId,
      // Updated course title as requested
      title: 'Professional Cleaning Techniques', 
      instructor: 'Dr. Sarah Johnson', // Instructor can remain or be updated if needed
      imageUrl: 'https://example.com/course-image.jpg', // Placeholder image
      rating: 4.8,
      price: 99.99,
      participants: 1234
    };
  }

  goBack(): void {
    this.router.navigate(['/course-dashboard']);
  }

  toggleSection(sectionId: number): void {
    const section = this.sections.find(s => s.id === sectionId);
    if (section) {
      section.isExpanded = !section.isExpanded;
    }
  }

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }


  onVideoEnded(): void {
    // Video will just end without auto-playing next
  }

  onTimeUpdate(): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      this.videoProgress = (video.currentTime / video.duration) * 100;
    }
  }

  toggleExtended(): void {
    this.isExtended = !this.isExtended;
  }
  adjustPlaybackSpeed(speed: number): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.playbackRate = speed;
    }
  }
  nextVideo(): void {
    if (this.currentModuleIndex < this.sections[this.currentSectionIndex].modules.length - 1) {
      this.currentModuleIndex++;
      this.loadCurrentVideo();
    } else if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.currentModuleIndex = 0;
      this.loadCurrentVideo();
    }
  }
  adjustVolume(volume: number): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.volume = volume;
    }
  }
  toggleFullscreen(): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.requestFullscreen();
    }
  }
  adjustProgress(progress: number): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.currentTime = (progress / 100) * video.duration;
    }
  }
  adjustPlaybackRate(rate: number): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.playbackRate = rate;
    }
  }
  

  onVideoLoaded(): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      // You can add additional initialization here
    }
  }

  previousVideo(): void {
    if (this.currentModuleIndex > 0) {
      this.currentModuleIndex--;
      this.loadCurrentVideo();
    } else if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.currentModuleIndex = this.sections[this.currentSectionIndex].modules.length - 1;
      this.loadCurrentVideo();
    }
  }

  private loadCurrentVideo(): void {
    // For now, we'll use the same video for all modules
    // In a real application, you would load different videos based on the module
    this.currentVideoUrl = 'assets/videos/sample.mp4';
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
    }
  }

  // Add method to get completion stats
  getCompletionStats() {
    let completed = 0;
    let total = 0;
    
    this.sections.forEach(section => {
      section.modules.forEach(module => {
        total++;
        if (module.isCompleted) completed++;
      });
    });
    
    return { completed, total };
  }

  // Add method to handle selection
  selectModule(sectionId: number, moduleId: number) {
    this.selectedSectionId = sectionId;
    this.selectedModuleId = moduleId;
    // Potentially load video/content related to the selected module here
    console.log(`Selected Module: Section ${sectionId}, Module ${moduleId}`);
  }

  // --- Support Tab Methods ---
  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  submitSupportRequest(): void {
    console.log('Support Request Submitted:', this.supportRequest);
    // Add actual submission logic here (e.g., API call)
    alert('Support request submitted successfully!'); // Placeholder feedback
    this.supportRequest = { name: '', email: '', subject: '', message: '' }; // Reset form
  }

  // --- Notes Tab Methods ---
  addOrUpdateNote(): void {
    if (!this.newNoteContent.trim()) return; // Don't add empty notes

    if (this.editingNoteId !== null) {
      // Update existing note
      const note = this.notes.find(n => n.id === this.editingNoteId);
      if (note) {
        note.content = this.newNoteContent;
        note.timestamp = new Date(); // Update timestamp on edit
      }
    } else {
      // Add new note
      const newNote = {
        id: Date.now(), // Simple unique ID generation
        content: this.newNoteContent,
        timestamp: new Date(),
        moduleId: this.selectedModuleId // Associate with the currently selected module
      };
      this.notes.push(newNote);
    }

    // Reset form state
    this.newNoteContent = '';
    this.editingNoteId = null;
    // Add logic to save notes (e.g., to localStorage or backend)
    console.log('Notes updated:', this.notes); 
  }

  editNote(note: { id: number, content: string, timestamp: Date, moduleId: number | null }): void {
    this.newNoteContent = note.content;
    this.editingNoteId = note.id;
  }

  deleteNote(noteId: number): void {
    this.notes = this.notes.filter(n => n.id !== noteId);
    // Add logic to save notes update
    console.log('Note deleted. Updated notes:', this.notes);
  }

  cancelEdit(): void {
    this.newNoteContent = '';
    this.editingNoteId = null;
  }
}
