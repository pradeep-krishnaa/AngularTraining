import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TagModule } from "primeng/tag";
import { Bug, BugService, Comment } from "./services/bug.service";
import { AuthService } from "./services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-bug-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, CardModule, InputTextareaModule, TagModule],
    templateUrl: './bug-detail.html',
    styleUrls: ['./bug-detail.css']
})

export class BugDetailComponent implements OnInit {
    bug?: Bug;
    newComment: string = '';
    comments: Comment[] = [];
    private commentsKey = 'bug-comments-';
    
    constructor(
        private bugService: BugService, 
        private route: ActivatedRoute,
        private authService: AuthService
    ) {}

    ngOnInit(){
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.bugService.getBug(id).subscribe({
            next: (bug) => {
                this.bug = bug;
                this.loadComments(id);
            }
        });
    }

    addComment(){
        if(this.newComment && this.newComment.trim() && this.bug){
            const comment: Comment = {
                id: Date.now(), // Simple ID generation
                author: 'Current User', // Will be enhanced when user info is available
                message: this.newComment.trim(),
                createdAt: new Date().toISOString()
            };
            
            this.comments.push(comment);
            this.saveComments(this.bug.id!);
            this.newComment = '';
        }
    }

    private loadComments(bugId: number) {
        const key = this.commentsKey + bugId;
        const savedComments = localStorage.getItem(key);
        if (savedComments) {
            try {
                this.comments = JSON.parse(savedComments);
            } catch (error) {
                console.error('Error loading comments:', error);
                this.comments = [];
            }
        }
    }

    private saveComments(bugId: number) {
        const key = this.commentsKey + bugId;
        localStorage.setItem(key, JSON.stringify(this.comments));
    }
}

