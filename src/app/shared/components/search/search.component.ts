import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ButtonLabelService } from '@app/services/button-label.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder?: string;
  @ViewChild("searchForm") public searchForm!: NgForm;

  constructor(public buttonLabelService: ButtonLabelService) {}

  // @Output() search?: string;
}

