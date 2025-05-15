import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.scss'
})
export class CourseManagementComponent {

  accordionItems = [
    { id: 'new-course', title: 'Add New Course', isOpen: false },
    { id: 'submissions', title: 'Instructor Submissions (3 Pending)', isOpen: false },
    { id: 'library', title: 'Course Library', isOpen: true },
    { id: 'recertification', title: 'Recertification Tracker', isOpen: false }
  ];

  tableColumns = [
    { key: 'title', label: 'Course Title' },
    { key: 'status', label: 'Status' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'modified', label: 'Last Modified' }
  ];

  filteredCourses = [
    { title: 'Safety Training', status: 'Published', instructor: 'John Doe', modified: new Date() },
    { title: 'HR Compliance', status: 'Draft', instructor: 'Jane Smith', modified: new Date() },
    // Add more dummy data
  ];

  currentSort = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';

  toggleAccordion(id: string) {
    this.accordionItems = this.accordionItems.map(item => ({
      ...item,
      isOpen: item.id === id ? !item.isOpen : false
    }));
  }
  
  // ... existing code ...

sortTable(key: string) {
  if (this.currentSort === key) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.currentSort = key;
    this.sortDirection = 'asc';
  }

  this.filteredCourses.sort((a, b) => {
    const aValue = a[key as keyof typeof a];
    const bValue = b[key as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return this.sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (aValue instanceof Date && bValue instanceof Date) {
      return this.sortDirection === 'asc' 
        ? aValue.getTime() - bValue.getTime() 
        : bValue.getTime() - aValue.getTime();
    }
    
    return 0;
  });
}

// ... existing code ...


  openPreview(course: any) {
    // Implement preview modal
  }

}
