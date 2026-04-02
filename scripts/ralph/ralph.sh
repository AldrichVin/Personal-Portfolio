#!/bin/bash

# ============================================
# RALPH - Autonomous AI Development Loop
# ============================================
# Named after Ralph Wiggum - naive, relentless persistence
#
# Usage: ./ralph.sh [max_iterations]
# Default: 10 iterations
#
# Requirements:
# - Claude Code CLI installed
# - jq for JSON processing
# ============================================

set -e

# Configuration
MAX_ITERATIONS=${1:-10}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PRD_FILE="$PROJECT_ROOT/tasks/prd.json"
PROGRESS_FILE="$PROJECT_ROOT/tasks/progress.txt"
PROMPT_FILE="$SCRIPT_DIR/CLAUDE.md"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  RALPH - Autonomous Development Loop${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Check prerequisites
if ! command -v claude &> /dev/null; then
    echo -e "${RED}Error: Claude Code CLI not found${NC}"
    echo "Install with: npm install -g @anthropic-ai/claude-code"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}Warning: jq not found. Install for better JSON handling.${NC}"
fi

# Check for PRD file
if [ ! -f "$PRD_FILE" ]; then
    echo -e "${RED}Error: PRD file not found at $PRD_FILE${NC}"
    echo "Create your task list first in tasks/prd.json"
    exit 1
fi

# Initialize progress file if it doesn't exist
if [ ! -f "$PROGRESS_FILE" ]; then
    echo "# Ralph Progress Log" > "$PROGRESS_FILE"
    echo "# Started: $(date)" >> "$PROGRESS_FILE"
    echo "" >> "$PROGRESS_FILE"
fi

# Function to check if all tasks are complete
check_completion() {
    if command -v jq &> /dev/null; then
        local incomplete=$(jq '[.userStories[] | select(.passes != true)] | length' "$PRD_FILE" 2>/dev/null || echo "1")
        if [ "$incomplete" == "0" ]; then
            return 0
        fi
    fi
    return 1
}

# Function to get task summary
get_task_summary() {
    if command -v jq &> /dev/null; then
        local total=$(jq '.userStories | length' "$PRD_FILE" 2>/dev/null || echo "?")
        local complete=$(jq '[.userStories[] | select(.passes == true)] | length' "$PRD_FILE" 2>/dev/null || echo "?")
        echo "$complete/$total"
    else
        echo "?/?"
    fi
}

echo -e "${GREEN}Configuration:${NC}"
echo "  Max iterations: $MAX_ITERATIONS"
echo "  PRD file: $PRD_FILE"
echo "  Progress file: $PROGRESS_FILE"
echo ""

# Main loop
for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo -e "${BLUE}============================================${NC}"
    echo -e "${BLUE}  Iteration $i of $MAX_ITERATIONS${NC}"
    echo -e "${BLUE}  Tasks: $(get_task_summary)${NC}"
    echo -e "${BLUE}============================================${NC}"
    echo ""

    # Check if all tasks are complete
    if check_completion; then
        echo -e "${GREEN}============================================${NC}"
        echo -e "${GREEN}  ALL TASKS COMPLETE!${NC}"
        echo -e "${GREEN}============================================${NC}"
        echo ""
        echo "<promise>COMPLETE</promise>"

        # Log completion
        echo "" >> "$PROGRESS_FILE"
        echo "## COMPLETED at $(date)" >> "$PROGRESS_FILE"
        echo "All tasks finished in $i iterations." >> "$PROGRESS_FILE"

        exit 0
    fi

    # Log iteration start
    echo "" >> "$PROGRESS_FILE"
    echo "---" >> "$PROGRESS_FILE"
    echo "## Iteration $i - $(date)" >> "$PROGRESS_FILE"

    # Run Claude Code with the prompt
    # The --print flag outputs without interactive mode
    # We pass the prompt file content as context
    echo -e "${YELLOW}Starting Claude Code...${NC}"
    echo ""

    # Run Claude with the ralph prompt
    claude --prompt "$(cat "$PROMPT_FILE")" --allowedTools "Edit,Write,Bash,Read,Glob,Grep" 2>&1 | tee -a "$PROGRESS_FILE"

    CLAUDE_EXIT=$?

    if [ $CLAUDE_EXIT -ne 0 ]; then
        echo -e "${YELLOW}Claude exited with code $CLAUDE_EXIT${NC}"
        echo "Claude exit code: $CLAUDE_EXIT" >> "$PROGRESS_FILE"
    fi

    # Auto-commit changes if there are any
    if [ -d "$PROJECT_ROOT/.git" ]; then
        cd "$PROJECT_ROOT"
        if ! git diff --quiet HEAD 2>/dev/null; then
            echo -e "${GREEN}Committing changes...${NC}"
            git add -A
            git commit -m "ralph: iteration $i - $(date +%Y-%m-%d_%H:%M)" --no-verify 2>/dev/null || true
        fi
    fi

    echo ""
    echo -e "${GREEN}Iteration $i complete.${NC}"
    echo ""

    # Small delay between iterations
    sleep 2
done

echo -e "${YELLOW}============================================${NC}"
echo -e "${YELLOW}  Max iterations reached ($MAX_ITERATIONS)${NC}"
echo -e "${YELLOW}  Tasks remaining: $(get_task_summary)${NC}"
echo -e "${YELLOW}============================================${NC}"

echo "" >> "$PROGRESS_FILE"
echo "## MAX ITERATIONS REACHED at $(date)" >> "$PROGRESS_FILE"
