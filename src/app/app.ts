import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceEducationComponent } from './components/experience-education/experience-education.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { MailModalComponent } from './components/mail-modal/mail-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceEducationComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    MailModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
