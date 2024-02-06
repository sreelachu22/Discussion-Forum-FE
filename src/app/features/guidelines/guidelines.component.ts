import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.css']
})
export class GuidelinesComponent {
  @ViewChild('template') template!: TemplateRef<void>;
  modalRef?: BsModalRef<any>;
  guidelines: string[]; 

  constructor(private modalService: BsModalService,private router: Router) {
   
    this.guidelines = [
      'Respectful Communication: Ensure that your words and tone are respectful and considerate towards fellow forum members. Disagreements are natural, but express your opinions in a constructive and courteous manner.',
      
      'No Hate Speech or Harassment: Avoid any form of hate speech, harassment, or discrimination based on race, gender, religion, or any other personal attribute. Create a positive and inclusive environment for everyone.',
      
      'Stay On Topic: Keep discussions focused on the relevant topics within each forum category. If you have a new idea or question, start a new thread rather than derailing an existing one.',
      
      'No Spam or Self-Promotion: Refrain from posting spam, advertisements, or excessive self-promotion. Contributions should add value to discussions rather than serve personal interests.',
      
      'Cite Sources and Be Factual: When sharing information or facts, provide credible sources if possible. Avoid spreading misinformation, and correct any errors if pointed out by other members.',
      
      'Use Appropriate Language: Keep language suitable for all audiences. Profanity, offensive language, or inappropriate content is not allowed.',
      
      'Respect Privacy: Do not share personal information about yourself or others without consent. Respect the privacy of forum members and refrain from engaging any form of privacy invasion.',
      
      'Be Patient and Help Others: If someone is seeking help or has a question, respond with patience and helpful information. Encourage a supportive atmosphere where members can learn from each other.',
      
      'Respect Forum Categories: Post content in the appropriate categories or sub-forums. This helps maintain an organized and easy-to-navigate forum structure.',
      
      'Continuous Improvement: Provide feedback to the forum administrators for improvements. Suggest new features or changes that could enhance the overall experience for the community.',

    ];
  }

  // Open the modal when the view is initialized
  ngAfterViewInit(): void { 
    this.modalRef = this.modalService.show(this.template, { class: 'modal-lg' }); // Use 'modal-lg' for a large modal
    this.modalRef?.onHidden?.subscribe(() => {
      // Navigate to the home route when the modal is hidden
      this.router.navigate(['']);
    });
  }
  // Close the modal and navigate to the home route
  close() {
    this.modalRef?.hide();
    this.router.navigate([''], {
    });
  }
}
