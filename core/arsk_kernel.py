class Decision:
    def __init__(self, decision):
        self.decision = decision

class ARSKKernel:
    def __init__(self, allowed_schemas):
        self.allowed_schemas = allowed_schemas

    def process(self, event):
        intent = event.get("intent")
        if intent in self.allowed_schemas:
            print(f"[ALLOW] Executing {intent} on {event['params']['path']}")
            return Decision("ALLOW")
        else:
            print(f"[DENY] Intent {intent} not allowed")
            return Decision("DENY")
