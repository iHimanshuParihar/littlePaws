import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faBuilding } from '@fortawesome/free-regular-svg-icons';
import { faMobileRetro } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faGithub = faGithub;
  faEnvelope = faEnvelope;
  faBuilding = faBuilding;
  faMobileRetro = faMobileRetro;
  constructor() { }

  ngOnInit(): void { }
}
