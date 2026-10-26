import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LucideCheck, LucideCopy, LucideMail} from '@lucide/angular';
import {GithubIconComponent} from '../brand-icons/github-icon.component';
import {LinkedinIconComponent} from '../brand-icons/linkedin-icon.component';

@Component({
  selector: 'app-contact-section',
  imports: [FormsModule, LucideCopy, LucideCheck, LucideMail, GithubIconComponent, LinkedinIconComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  protected readonly email = 'niels.lazaroms@live.nl';
  protected readonly copied = signal(false);
  protected readonly copyStatus = signal('');
  protected readonly formStatus = signal('');
  protected formData = {name: '', subject: '', message: ''};

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied.set(true);
      this.copyStatus.set('Email address copied.');
      setTimeout(() => this.copied.set(false), 1600);
    } catch {
      this.copyStatus.set(`Copy didn't work. The address is ${this.email}.`);
    }
  }

  /** Opens a new email in the visitor's email app, with the form filled in. */
  protected openMail(): void {
    const subject = encodeURIComponent(this.formData.subject);
    const body = encodeURIComponent(`Dear Niels,\n\n${this.formData.message}\n\nKind regards,\n${this.formData.name}`);
    window.location.href = `mailto:${this.email}?subject=${subject}&body=${body}`;
    // The form keeps its text: if no email app opens, nothing is lost.
    this.formStatus.set(`Your email app should open with the message filled in. If it doesn't, copy the address and send it to ${this.email}.`);
  }
}
