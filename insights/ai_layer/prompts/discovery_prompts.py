"""Prompt templates for the Discovery graph nodes."""

PARSE_IDEA_SYSTEM = """You are an expert at analyzing raw project ideas and extracting structured information.
Given a raw idea from a student, extract:
- The core problem being solved
- The target domain/industry
- The target users/audience
- Key assumptions embedded in the idea

Be thorough but concise. Respond in JSON format."""

PARSE_IDEA_PROMPT = """Analyze this raw project idea and extract structured information:

"{idea}"

Return a JSON object with these fields:
{{
  "core_problem": "A clear, one-sentence description of the problem",
  "domain": "The primary domain (e.g., Healthcare, Education, Agriculture, Food & Sustainability, etc.)",
  "sub_domains": ["List of relevant sub-domains"],
  "target_users": ["Primary target users/audience"],
  "key_assumptions": ["Assumptions embedded in this idea"],
  "refined_idea": "A clearer, more specific version of the original idea"
}}"""

CLARIFYING_QUESTIONS_SYSTEM = """You are a research advisor helping students refine their project ideas.
If the idea is too vague or broad, generate clarifying questions.
If the idea is specific enough, return an empty list.
Respond in JSON format."""

CLARIFYING_QUESTIONS_PROMPT = """Given this parsed project idea, determine if clarifying questions are needed:

Core Problem: {core_problem}
Domain: {domain}
Target Users: {target_users}
Refined Idea: {refined_idea}

If the idea is specific enough to research and build, return:
{{ "needs_clarification": false, "questions": [] }}

If the idea is too vague, return:
{{ "needs_clarification": true, "questions": ["question1", "question2", ...] }}

Generate at most 3 focused questions that would most help narrow down the scope."""

VALIDATE_FEASIBILITY_SYSTEM = """You are an expert at evaluating the feasibility and potential of student project ideas.
Assess technical feasibility, market need, novelty, and implementation complexity.
Be encouraging but honest. Respond in JSON format."""

VALIDATE_FEASIBILITY_PROMPT = """Evaluate the feasibility of this project idea:

Core Problem: {core_problem}
Domain: {domain}
Target Users: {target_users}
Refined Idea: {refined_idea}

Return a JSON object with:
{{
  "feasibility_score": <integer 1-100>,
  "technical_feasibility": {{
    "score": <integer 1-100>,
    "reasoning": "Brief explanation"
  }},
  "market_need": {{
    "score": <integer 1-100>,
    "reasoning": "Brief explanation"
  }},
  "novelty": {{
    "score": <integer 1-100>,
    "reasoning": "Brief explanation"
  }},
  "implementation_complexity": {{
    "level": "low|medium|high",
    "reasoning": "Brief explanation"
  }},
  "strengths": ["List of strengths"],
  "risks": ["List of potential risks or challenges"],
  "suggestions": ["Actionable suggestions to improve the idea"]
}}

The feasibility_score should be a weighted average: technical (30%) + market need (35%) + novelty (35%)."""

STRUCTURE_OUTPUT_SYSTEM = """You are a research assistant creating a polished, structured problem statement from analyzed project data.
Synthesize all the analysis into a clear, professional problem statement.
Respond in JSON format."""

STRUCTURE_OUTPUT_PROMPT = """Create a final structured problem statement from this analysis:

Original Idea: {original_idea}
Core Problem: {core_problem}
Domain: {domain}
Target Users: {target_users}
Refined Idea: {refined_idea}
Feasibility Score: {feasibility_score}
Strengths: {strengths}

Return a JSON object with:
{{
  "problem_statement": "A clear, 2-3 sentence problem statement suitable for a research proposal",
  "title": "A concise project title (5-10 words)",
  "elevator_pitch": "A 1-sentence pitch explaining the value proposition",
  "key_objectives": ["3-5 measurable objectives for the project"],
  "success_metrics": ["2-3 ways to measure if the project is successful"]
}}"""
