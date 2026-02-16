# Contributing to FranchiseConnect

Thank you for your interest in contributing to FranchiseConnect! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** and clone it locally.
2. **Install dependencies** with `npm install`.
3. **Create a branch** for your feature or fix: `git checkout -b feature/your-feature-name`.
4. **Make your changes** following the guidelines below.
5. **Test your changes** locally with `npm run dev` and `npm run build`.
6. **Submit a pull request** with a clear description of what you changed and why.

## Development Guidelines

### Code Style

- Use **TypeScript** for all new files.
- Follow the existing project conventions (functional components, named exports for utilities).
- Use **Tailwind CSS** classes for styling. Avoid inline styles and CSS modules.
- Use the design tokens defined in `tailwind.config.ts` rather than arbitrary values.

### Component Guidelines

- Place page components in `app/` following the Next.js App Router convention.
- Place reusable UI components in `components/ui/`.
- Place feature-specific components in `components/<feature>/`.
- Use Radix UI primitives for accessible, headless interactive components.

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `FranchiseCard.tsx` |
| Files | kebab-case | `franchise-card.tsx` |
| Utilities | camelCase | `formatCurrency()` |
| Types | PascalCase | `FranchiseListing` |
| Zustand stores | camelCase with `use` prefix | `useSavedListingsStore` |

### State Management

- Use **Zustand** for global state. Add new stores in `lib/store/index.ts`.
- Use `persist` middleware only for state that should survive page reloads.
- Keep component-local state in `useState` when it doesn't need to be shared.

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add franchise detail page with investment breakdown
fix: resolve filter dropdown closing on selection
refactor: extract currency formatting into shared utility
docs: update README with deployment instructions
```

Prefixes: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`.

## Pull Request Process

1. Ensure your code builds without errors (`npm run build`).
2. Ensure linting passes (`npm run lint`).
3. Update documentation if you've changed any public APIs or added features.
4. Fill out the PR template with a description, screenshots (for UI changes), and testing steps.
5. Request a review from a maintainer.

## Reporting Issues

When reporting bugs, please include:

- A clear description of the issue.
- Steps to reproduce.
- Expected vs actual behavior.
- Browser and device information.
- Screenshots or screen recordings if applicable.

## Code of Conduct

Be respectful and constructive in all interactions. We're building something together.
