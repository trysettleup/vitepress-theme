<template>
  <div class="card-grid">
    <slot />
  </div>
</template>

<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 24px 0;
}

.card-grid a.card-link {
  display: block;
  padding: 20px;
  border: 1px solid var(--bg-surface);
  border-radius: 10px;
  text-decoration: none;
  transition: border-color 0.2s;
}

.card-grid a.card-link:hover {
  border-color: var(--accent-primary);
  text-decoration: none;
}

.card-grid .card-icon {
  color: var(--accent-primary);
  margin-bottom: 10px;
}

.card-grid .card-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.card-grid .card-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
