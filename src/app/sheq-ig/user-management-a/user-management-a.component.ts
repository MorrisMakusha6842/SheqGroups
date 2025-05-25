import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management-a',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management-a.component.html',
  styleUrl: './user-management-a.component.scss'
})
export class UserManagementAComponent implements OnInit {

  // Province filter
  selectedProvince: string = 'All Provinces';

  // User metrics properties
  totalActiveUsers: number = 152;
  usersAwaitingApproval: number = 8;
  totalUsers: number = 165;
  completedUsers: number = 134;
  userCompletionPercentage: number = 81;

  // User registration requests data
  userRegistrationRequests = [
    { fullName: 'Sarah Mitchell', department: 'Safety', position: 'Safety Inspector', requestDate: new Date('2024-12-15'), status: 'Pending' },
    { fullName: 'Michael Johnson', department: 'Operations', position: 'Site Supervisor', requestDate: new Date('2024-12-14'), status: 'Approved' },
    { fullName: 'Emily Davis', department: 'Training', position: 'Training Coordinator', requestDate: new Date('2024-12-13'), status: 'Pending' },
    { fullName: 'Robert Wilson', department: 'Maintenance', position: 'Equipment Technician', requestDate: new Date('2024-12-12'), status: 'Rejected' },
    { fullName: 'Lisa Anderson', department: 'HR', position: 'HR Specialist', requestDate: new Date('2024-12-11'), status: 'Pending' },
    { fullName: 'David Brown', department: 'Safety', position: 'Safety Officer', requestDate: new Date('2024-12-10'), status: 'Approved' },
    { fullName: 'Jennifer Taylor', department: 'Operations', position: 'Shift Leader', requestDate: new Date('2024-12-09'), status: 'Pending' },
    { fullName: 'Mark Thompson', department: 'Training', position: 'Instructor', requestDate: new Date('2024-12-08'), status: 'Approved' },
    { fullName: 'Amanda Garcia', department: 'Maintenance', position: 'Maintenance Supervisor', requestDate: new Date('2024-12-07'), status: 'Pending' },
    { fullName: 'Christopher Lee', department: 'Operations', position: 'Site Manager', requestDate: new Date('2024-12-06'), status: 'Approved' },
    { fullName: 'Rachel Martinez', department: 'Safety', position: 'Safety Analyst', requestDate: new Date('2024-12-05'), status: 'Rejected' },
    { fullName: 'Kevin Miller', department: 'Training', position: 'Skills Assessor', requestDate: new Date('2024-12-04'), status: 'Pending' }
  ];

  // User activity updates data
  userActivityUpdates = [
    { action: 'Completed Safety Training', userName: 'John Smith', timestamp: new Date('2024-12-15'), type: 'Training' },
    { action: 'Profile Updated', userName: 'Sarah Johnson', timestamp: new Date('2024-12-14'), type: 'Profile' },
    { action: 'Logged In', userName: 'Mike Wilson', timestamp: new Date('2024-12-13'), type: 'Login' },
    { action: 'Training Progress Updated', userName: 'Emma Davis', timestamp: new Date('2024-12-12'), type: 'Training' },
    { action: 'Password Changed', userName: 'Tom Brown', timestamp: new Date('2024-12-11'), type: 'Profile' },
    { action: 'Completed Assessment', userName: 'Lisa Garcia', timestamp: new Date('2024-12-10'), type: 'Training' },
    { action: 'Logged In', userName: 'David Lee', timestamp: new Date('2024-12-09'), type: 'Login' },
    { action: 'Certificate Downloaded', userName: 'Rachel Green', timestamp: new Date('2024-12-08'), type: 'Training' },
    { action: 'Profile Photo Updated', userName: 'James Carter', timestamp: new Date('2024-12-07'), type: 'Profile' },
    { action: 'Training Enrolled', userName: 'Maria Rodriguez', timestamp: new Date('2024-12-06'), type: 'Training' },
    { action: 'Logged In', userName: 'Robert Kim', timestamp: new Date('2024-12-05'), type: 'Login' },
    { action: 'Contact Info Updated', userName: 'Amy Zhang', timestamp: new Date('2024-12-04'), type: 'Profile' },
    { action: 'Course Completed', userName: 'Carlos Lopez', timestamp: new Date('2024-12-03'), type: 'Training' },
    { action: 'Logged In', userName: 'Jennifer White', timestamp: new Date('2024-12-02'), type: 'Login' }
  ];

  // User table configuration
  userTableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'department', label: 'Department' },
    { key: 'position', label: 'Position' },
    { key: 'status', label: 'Status' },
    { key: 'lastLogin', label: 'Last Login' }
  ];

  // User directory data
  filteredUsers = [
    { name: 'John Smith', department: 'Safety', position: 'Safety Manager', status: 'Active', lastLogin: new Date('2024-12-15') },
    { name: 'Sarah Johnson', department: 'Operations', position: 'Site Supervisor', status: 'Active', lastLogin: new Date('2024-12-14') },
    { name: 'Mike Wilson', department: 'Training', position: 'Training Manager', status: 'Active', lastLogin: new Date('2024-12-13') },
    { name: 'Emma Davis', department: 'HR', position: 'HR Coordinator', status: 'Pending', lastLogin: new Date('2024-12-12') },
    { name: 'Tom Brown', department: 'Maintenance', position: 'Maintenance Lead', status: 'Active', lastLogin: new Date('2024-12-11') },
    { name: 'Lisa Garcia', department: 'Safety', position: 'Safety Officer', status: 'Active', lastLogin: new Date('2024-12-10') },
    { name: 'David Lee', department: 'Operations', position: 'Shift Manager', status: 'Inactive', lastLogin: new Date('2024-12-05') },
    { name: 'Rachel Green', department: 'Training', position: 'Instructor', status: 'Active', lastLogin: new Date('2024-12-14') },
    { name: 'James Carter', department: 'Maintenance', position: 'Technician', status: 'Active', lastLogin: new Date('2024-12-13') },
    { name: 'Maria Rodriguez', department: 'Safety', position: 'Safety Analyst', status: 'Active', lastLogin: new Date('2024-12-12') }
  ];

  // Sorting properties
  currentUserSort = 'name';
  userSortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    // Removed FormBuilder and initializeForm call
  }

  ngOnInit() {
    this.calculateUserMetrics();
  }

  private calculateUserMetrics() {
    // Calculate user completion percentage
    this.userCompletionPercentage = Math.round((this.completedUsers / this.totalUsers) * 100);
    
    // Update total active users
    this.totalActiveUsers = this.totalUsers - this.usersAwaitingApproval;
  }

  // User table sorting
  sortUserTable(key: string) {
    if (this.currentUserSort === key) {
      this.userSortDirection = this.userSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentUserSort = key;
      this.userSortDirection = 'asc';
    }

    this.filteredUsers.sort((a, b) => {
      const aValue = a[key as keyof typeof a];
      const bValue = b[key as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.userSortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return this.userSortDirection === 'asc' 
          ? aValue.getTime() - bValue.getTime() 
          : bValue.getTime() - aValue.getTime();
      }
      
      return 0;
    });
  }

  // User management methods
  viewUserProfile(user: any) {
    console.log('Viewing user profile:', user);
    // Implement user profile modal or navigation
  }

  editUser(user: any) {
    console.log('Editing user:', user);
    // Implement user edit modal or navigation
  }

  // Additional methods can be added here for user management functionality
  approveUserRequest(request: any) {
    console.log('Approving user request:', request);
    // Implement approval logic
  }

  rejectUserRequest(request: any) {
    console.log('Rejecting user request:', request);
    // Implement rejection logic
  }

  // Navigation to create user account
  navigateToCreateUser() {
    this.router.navigate(['/create-user-account']);
  }
}
