<script setup lang="ts">
import WorkflowDiagram from './WorkflowDiagram.vue'

interface WorkflowStep {
  label: string
  color?: string
}

interface ActionLink {
  text: string
  link: string
}

interface CodeBlock {
  filename: string
  html: string
}

defineProps<{
  title: string
  description: string
  primaryAction: ActionLink
  secondaryAction?: ActionLink
  codeBlock?: CodeBlock
  showWorkflowDiagram?: boolean
  workflowSteps?: WorkflowStep[]
}>()

function isExternalLink(url: string): boolean {
  return url.startsWith('http')
}
</script>

<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-blob hero-blob-cyan"></div>
      <div class="hero-blob hero-blob-indigo"></div>
    </div>

    <div class="hero-inner">
      <div class="hero-left">
        <h1 class="hero-title" v-html="title"></h1>
        <p class="hero-description">{{ description }}</p>
        <div class="hero-buttons">
          <a :href="primaryAction.link" class="btn-primary" v-html="primaryAction.text"></a>
          <a
            v-if="secondaryAction"
            :href="secondaryAction.link"
            class="btn-secondary"
            v-bind="isExternalLink(secondaryAction.link) ? { target: '_blank', rel: 'noopener' } : {}"
          >{{ secondaryAction.text }}</a>
        </div>
      </div>

      <div v-if="codeBlock || showWorkflowDiagram" class="hero-right">
        <div v-if="codeBlock" class="code-block">
          <div class="code-header">
            <span class="code-dot dot-red"></span>
            <span class="code-dot dot-yellow"></span>
            <span class="code-dot dot-green"></span>
            <span class="code-title">{{ codeBlock.filename }}</span>
          </div>
          <div class="code-body" v-html="codeBlock.html"></div>
        </div>

        <WorkflowDiagram v-if="showWorkflowDiagram" :steps="workflowSteps" />
      </div>
    </div>

    <div class="glow-divider"></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 120px 0 100px;
  overflow: hidden;
  background-color: var(--dark-base);
  background-image: radial-gradient(circle, var(--dark-surface) 1px, transparent 1px);
  background-size: 24px 24px;
  color: var(--dark-text);
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
}

.hero-blob-cyan {
  top: -80px;
  right: 0;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 60%);
}

.hero-blob-indigo {
  bottom: -60px;
  left: 10%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
}

.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
}

.hero-title {
  font-size: 3.25rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--dark-text);
}

:deep(.gradient-text) {
  background: linear-gradient(135deg, #0EA5E9, #06B6D4, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--dark-text-muted);
  margin-bottom: 32px;
  max-width: 480px;
}

.hero-buttons {
  display: flex;
  gap: 12px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  border-radius: 10px;
  background-color: var(--accent-primary);
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 0 24px var(--accent-glow);
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
  text-decoration: none;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 10px;
  background-color: var(--dark-elevated);
  border: 1px solid var(--dark-surface);
  color: var(--dark-text);
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.2s;
}

.btn-secondary:hover {
  border-color: var(--accent-primary);
  text-decoration: none;
}

.hero-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Code block */
.code-block {
  background-color: var(--dark-elevated);
  border: 1px solid var(--dark-surface);
  border-radius: 12px;
  overflow: hidden;
  font-size: 0.8125rem;
  line-height: 1.7;
  box-shadow: 0 0 40px rgba(14, 165, 233, 0.1), 0 0 80px rgba(99, 102, 241, 0.05);
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
  padding: 16px;
  font-family: var(--font-mono);
}

/* Code token colors (v-html content needs :deep) */
.code-body :deep(.c-comment) { color: var(--dark-text-muted); }
.code-body :deep(.c-variable) { color: #F472B6; }
.code-body :deep(.c-function) { color: var(--dark-accent); }
.code-body :deep(.c-string) { color: #34D399; }

/* Divider */
.glow-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--bg-surface);
}

@media (max-width: 768px) {
  .hero {
    padding: 80px 0 60px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 0 24px;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-description {
    max-width: 100%;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .hero-right {
    min-width: 0;
    overflow: hidden;
  }

  .code-block {
    min-width: 0;
  }

  .code-body {
    overflow-x: auto;
  }
}
</style>
