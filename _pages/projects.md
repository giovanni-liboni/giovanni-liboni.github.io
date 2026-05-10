---
layout: page
title: projects
permalink: /projects/
description: Side projects, research code, and experiments.
nav: true
---

<div class="projects">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  {% for project in sorted_projects %}
  <a class="project-card" {% if project.redirect %}href="{{ project.redirect }}" target="_blank" rel="noopener"{% else %}href="{{ project.url | relative_url }}"{% endif %}>
    {% if project.img %}<img src="{{ project.img | relative_url }}" alt="{{ project.title }} preview">{% endif %}
    <div class="project-title">{{ project.title }}</div>
    {% if project.description %}<div class="project-desc">{{ project.description }}</div>{% endif %}
    {% if project.github %}
    <div class="project-meta">
      {{ project.github | replace: "https://github.com/", "" }}
      {% if project.github_stars %} · ★ <span id="{{ project.github_stars }}-stars"></span>{% endif %}
    </div>
    {% endif %}
  </a>
  {% endfor %}
</div>
