# rn0_v2

## @media (prefers-reduced-motion: reduce)

```css
@media (prefers-reduced-motion: reduce) {
  .accordion .accordion-body,
  .accordion .accordion-body > .accordion-content,
  .accordion .accordion-controller i {
    transition: none !important;
    transition-delay: 0ms !important;
  }
}
```

- 사용자가 OS에서 ‘애니메이션 줄이기(모션 줄이기)’ 설정을 켜놨으면, 애니메이션을 꺼주는 접근성(Accessibility)용 CSS
