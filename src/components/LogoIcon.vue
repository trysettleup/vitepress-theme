<template>
  <span class="logo-box">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="5" r="2.5" stroke="var(--logo-icon-color)"/>
      <circle cx="6" cy="19" r="2.5" stroke="var(--logo-icon-color)"/>
      <circle cx="18" cy="19" r="2.5" stroke="var(--logo-icon-color)"/>
      <line x1="12" y1="7.5" x2="6" y2="16.5" stroke="var(--logo-icon-color)"/>
      <line x1="12" y1="7.5" x2="18" y2="16.5" stroke="var(--logo-icon-color)"/>
    </svg>
  </span>
</template>

<style scoped>
.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--logo-box-bg);
  border: 1px solid var(--logo-box-border);
  border-radius: 8px;
  flex-shrink: 0;
}
</style>
