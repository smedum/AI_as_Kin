# Quick Start

## Installation & Basic Usage

```bash
# Clone and install
git clone https://github.com/smedum/AI_as_Kin.git
cd AI_as_Kin
pip install -r requirements.txt

# Basic usage example
python -c "
from ai_as_kin import RelationalAI
ai = RelationalAI()
results = ai.query('cultural_heritage')
print(results)
"
