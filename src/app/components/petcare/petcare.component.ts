import { Component, OnInit } from '@angular/core';

export interface dog {
  id: any;
  vaccine: any;
  primaryPuppy: any;
  primaryAdult: any;
  booster:any;
  Recommndation:any;
}
export interface cat {
  id: any;
  vaccine: any;
  primaryPuppy: any;
  primaryAdult: any;
  booster:any;
  Recommndation:any;
}

const ELEMENT_DATA : dog[]=[
  {
    id:1,
    vaccine : "Distemper ",
    primaryPuppy:"3 doses, 2-3-4 months",
    primaryAdult:"3 doses, 2-3 weeks",
    booster:"Annual",
    Recommndation : "Highly recommended for all ages"

  },
  {
    id:2,
    vaccine : "Adenovirus – 2  ",
    primaryPuppy:"3 doses, 2-3-4 months",
    primaryAdult:"3 doses, 2-3-4 wk apart",
    booster:"Annual",
    Recommndation : "Highly recommended for all ages"

  },
  {
    id:3,
    vaccine : "Parainfluenza  ",
    primaryPuppy:"3 doses, 2-3-4 months",
    primaryAdult:"3 doses, 2-3-4 wk apart",
    booster:"Annual",
    Recommndation : "Highly recommended for all ages"

  },
  {
    id:4,
    vaccine : "Bordetella bronchiseptica  ",
    primaryPuppy:"3 doses, 6-9-12 weeks",
    primaryAdult:"2-3 doses 3 wk apart",
    booster:"Annual",
    Recommndation : "Recommended for dog housed in Kennels, Pounds, etc."

  },
  {
    id:5,
    vaccine : "Parvovirus ",
    primaryPuppy:"3 doses, 2-3-4 months",
    primaryAdult:"1 dose",
    booster:"Annual",
    Recommndation : "Highly recommended for all ages.Optional dose at 5 months- to overcome maternal antibody interference"

  },
  {
    id:6,
    vaccine : "Lyme Disease : Borrelia burgdorferi ",
    primaryPuppy:"Two doses :  may be at 12 and 15 wks",
    primaryAdult:"2-3 doses 3 wks apart",
    booster:"Annual",
    Recommndation : "Optional, has regional prevalence"

  },
  {
    id:7,
    vaccine : "Corona Virus",
    primaryPuppy:"Begin at 6 weeks & every 3 wks until 12 wks of age",
    primaryAdult:"2-3 doses, 3 wks apart",
    booster:"Annual",
    Recommndation : "Optional. Incidence not known – Routine vaccination to be justified.MLV not available."

  },
  {
    id:8,
    vaccine : "Leptospirosis  ",
    primaryPuppy:"8th and 11th wk",
    primaryAdult:"2 doses, 3-4 wk apart",
    booster:"Annual",
    Recommndation : "Typically administered in combination with Distemper and ICH"

  },
  {
    id:9,
    vaccine : "Giardia  ",
    primaryPuppy:"8th and 11th wk",
    primaryAdult:" 6 months",
    booster:"Annual",
    Recommndation : "Optional"

  },
  {
    id:10,
    vaccine : "Rabies ",
    primaryPuppy:"3 months of age",
    primaryAdult:"1 dose",
    booster:"Annual",
    Recommndation : "Booster optional but beneficial, IM route ( depends on local statutes).Some recommend first dose earlier than 3months in endemic/high exposure area "

  }
]

const ELEMENT_DATA1 :  cat[] =[
  {
    id:1,
    vaccine : "Feline Distemper (Panleukopenia)  ",
    primaryPuppy:"As early as 6 weeks, then every 3-4 weeks until 16 weeks of age",
    primaryAdult:" 2 doses, 3-4 weeks apart",
    booster:"1 dose is given a year after the last dose of the initial series, then every 3 years.",
    Recommndation : "Core cat vaccine. Feline distemper is a severe contagious disease that most commonly strikes kittens and can cause death."
  },

  {
    id:2,
    vaccine : "Rabies  ",
    primaryPuppy:"Single dose as early as 8 weeks of age, depending on the product. Revaccinate 1 year later",
    primaryAdult:"single dose with yearly booster",
    booster:" Required annually or every 3 years, depending on vaccine used. State regulations may determine the frequency and type of booster required.",
    Recommndation : "Core cat vaccine. Rabies is 100% fatal to cats, with no treatment available. Prevention is key."
  },

  {
    id:3,
    vaccine : "Feline Herpesvirus   ",
    primaryPuppy:"As early as 6 weeks, then every 3-4 weeks until 16 weeks of age",
    primaryAdult:" 2 doses, 3-4 weeks apart",
    booster:" 1 dose is given a year after the last dose of the initial series, then every 3 years.",
    Recommndation : "Core cat vaccine. Feline herpesvirus causes feline viral rhinotracheitis (FVR), a very contagious upper respiratory condition."

  },

  {
    id:4,
    vaccine : "Calicivirus  ",
    primaryPuppy:"As early as 6 weeks, then every 3-4 weeks until 16 weeks of age    ",
    primaryAdult:" 2 doses, 3-4 weeks apart ",
    booster:" 1 dose is given a year after the last dose of the initial series, then every 3 years.",
    Recommndation : "Core cat vaccine. A very contagious upper respiratory condition that can cause joint pain, oral ulcerations, fever, and anorexia. "

  },

  {
    id:5,
    vaccine : "Feline Leukemia Virus (FeLV)   ",
    primaryPuppy:"As early as 8 weeks, then 3-4 weeks later  ",
    primaryAdult:" 2 doses, 3-4 weeks apart    ",
    booster:"Every kitten should get a booster at one year. If the cat doesn't go outside, no further vaccination is needed unless they are at higher risk. then annually.",
    Recommndation : "Non-core cat vaccine. Should test FeLV negative first. Transmitted via cat-to-cat contact. Can cause cancer, immunosuppressant"

  },

  {
    id:6,
    vaccine : "Bordetella     ",
    primaryPuppy:"As early as 4 weeks    ",
    primaryAdult:" 2 doses,1 year apart",
    booster:"Annual",
    Recommndation : "Non-core cat vaccine. A contagious upper respiratory condition."

  }
]

@Component({
  selector: 'app-petcare',
  templateUrl: './petcare.component.html',
  styleUrls: ['./petcare.component.scss']
})
export class PetcareComponent {

  
  dataSource = ELEMENT_DATA;
  dataSource2 = ELEMENT_DATA1;

  header = ["id","vaccine","primaryPuppy","primaryAdult","booster","Recommndation"]

}
