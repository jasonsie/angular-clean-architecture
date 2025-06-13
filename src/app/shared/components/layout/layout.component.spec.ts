import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(async () => {
    const breakpointSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);

    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;

    // Mock breakpoint observer to return desktop by default
    breakpointObserver.observe.and.returnValue(of({ matches: false, breakpoints: {} }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sidenav open on desktop', () => {
    fixture.detectChanges();
    expect(component.isSidenavOpen()).toBe(true);
    expect(component.isHandset()).toBe(false);
  });

  it('should set sidenav mode to "side" on desktop', () => {
    fixture.detectChanges();
    expect(component.sidenavMode()).toBe('side');
  });

  it('should set sidenav mode to "over" on mobile', () => {
    // Mock mobile breakpoint
    breakpointObserver.observe.and.returnValue(of({ matches: true, breakpoints: {} }));

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.isHandset()).toBe(true);
    expect(component.sidenavMode()).toBe('over');
  });

  it('should have backdrop on mobile but not on desktop', () => {
    // Test desktop (no backdrop)
    fixture.detectChanges();
    expect(component.sidenavHasBackdrop()).toBe(false);

    // Test mobile (has backdrop)
    breakpointObserver.observe.and.returnValue(of({ matches: true, breakpoints: {} }));
    component.ngOnInit();
    expect(component.sidenavHasBackdrop()).toBe(true);
  });

  it('should toggle sidenav state', () => {
    fixture.detectChanges();
    const initialState = component.isSidenavOpen();

    component.toggleSidenav();

    expect(component.isSidenavOpen()).toBe(!initialState);
  });

  it('should close sidenav on mobile when closeSidenav is called', () => {
    // Set mobile state
    breakpointObserver.observe.and.returnValue(of({ matches: true, breakpoints: {} }));
    fixture.detectChanges();
    component.ngOnInit();

    // Ensure sidenav is initially closed on mobile
    expect(component.isSidenavOpen()).toBe(false);

    // Open it manually
    component.isSidenavOpen.set(true);
    expect(component.isSidenavOpen()).toBe(true);

    // Call closeSidenav
    component.closeSidenav();

    expect(component.isSidenavOpen()).toBe(false);
  });

  it('should not close sidenav on desktop when closeSidenav is called', () => {
    fixture.detectChanges();

    // Ensure sidenav is open on desktop
    expect(component.isSidenavOpen()).toBe(true);

    // Call closeSidenav
    component.closeSidenav();

    // Should remain open on desktop
    expect(component.isSidenavOpen()).toBe(true);
  });

  it('should clean up subscriptions on destroy', () => {
    fixture.detectChanges();
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

  it('should render header with correct title', () => {
    fixture.detectChanges();

    const headerElement = fixture.nativeElement.querySelector('.toolbar-title');
    expect(headerElement?.textContent?.trim()).toBe('Board Application');
  });

  it('should render navigation items', () => {
    fixture.detectChanges();

    const navItems = fixture.nativeElement.querySelectorAll('mat-list-item[routerLink]');
    expect(navItems.length).toBeGreaterThan(0);

    // Check for specific navigation items
    const dashboardLink = fixture.nativeElement.querySelector('mat-list-item[routerLink="/board/dashboard"]');
    const projectsLink = fixture.nativeElement.querySelector('mat-list-item[routerLink="/board/projects"]');

    expect(dashboardLink).toBeTruthy();
    expect(projectsLink).toBeTruthy();
  });

  it('should have menu toggle button', () => {
    fixture.detectChanges();

    const menuButton = fixture.nativeElement.querySelector('.menu-button');
    expect(menuButton).toBeTruthy();
  });

  it('should have footer with copyright', () => {
    fixture.detectChanges();

    const footer = fixture.nativeElement.querySelector('.layout-footer');
    expect(footer).toBeTruthy();

    const copyrightText = footer.textContent;
    expect(copyrightText).toContain('2025 Board Application');
  });
});
