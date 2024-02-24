
import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';

export const NameGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return true;
}
