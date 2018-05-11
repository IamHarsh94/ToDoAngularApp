import { ColorToolDirective } from './color-tool.directive';
import { Directive, ElementRef, Input, AfterViewInit, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

describe('ColorToolDirective', () => {
  it('should create an instance', () => {
    const directive = new ColorToolDirective(ElementRef,Router,ActivatedRoute);
    expect(directive).toBeTruthy();
  });
});
