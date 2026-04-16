<script setup lang="ts">
interface ActionLink {
  text: string
  link: string
}

interface CodeBlock {
  filename: string
  html: string
}

defineProps<{
  label?: string
  heading: string
  description: string
  action?: ActionLink
  codeBlock: CodeBlock
}>()
</script>

<template>
  <section class="code-showcase">
    <div class="showcase-inner">
      <div class="showcase-text">
        <span v-if="label" class="section-label">{{ label }}</span>
        <h2 v-html="heading"></h2>
        <p>{{ description }}</p>
        <a v-if="action" :href="action.link" class="showcase-btn" v-html="action.text"></a>
      </div>
      <div class="showcase-spacer"></div>
      <div class="showcase-code">
        <div class="code-block">
          <div class="code-header">
            <span class="code-dot dot-red"></span>
            <span class="code-dot dot-yellow"></span>
            <span class="code-dot dot-green"></span>
            <span class="code-title">{{ codeBlock.filename }}</span>
          </div>
          <pre class="code-body"><code v-html="codeBlock.html"></code></pre>
        </div>
      </div>
    </div>
    <div class="glow-divider"></div>
  </section>
</template>

<style scoped>
.code-showcase {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

.showcase-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 3fr;
  gap: 0;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
}

.section-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--accent-primary);
  margin-bottom: 8px;
}

.showcase-text h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 12px;
}

:deep(.gradient-text) {
  background: linear-gradient(135deg, #0EA5E9, #06B6D4, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.showcase-text p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 24px;
}

.showcase-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: var(--accent-primary);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}

.showcase-btn:hover {
  opacity: 0.9;
  text-decoration: none;
}

.code-block {
  background-color: var(--dark-elevated);
  border: 1px solid var(--dark-surface);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 40px var(--dark-glow);
}

.code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--dark-surface);
  background-color: var(--dark-header);
}

.code-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red { background-color: #EF4444; }
.dot-yellow { background-color: #EAB308; }
.dot-green { background-color: #22C55E; }

.code-title {
  margin-left: 8px;
  color: var(--dark-text);
  font-size: 0.75rem;
}

.code-body {
  margin: 0;
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.7;
  white-space: pre;
  color: var(--dark-text-muted);
  overflow-x: auto;
  background: transparent;
}

.code-body code {
  font-family: inherit;
  font-size: inherit;
}

.showcase-code {
  min-width: 0;
}

.glow-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--bg-surface);
}

@media (max-width: 768px) {
  .code-showcase {
    padding: 60px 0;
  }

  .showcase-inner {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 24px;
  }

  .showcase-spacer {
    display: none;
  }
}
</style>
