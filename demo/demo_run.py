from core.arsk_kernel import ARSKKernel

def create_fake_event():
    return {
        "id": "E1",
        "agent": "demo-agent",
        "intent": "file.write",
        "params": {"path": "/tmp/test.txt", "content": "hello world"}
    }

def main():
    kernel = ARSKKernel(allowed_schemas={"file.write", "file.read"})
    event = create_fake_event()
    decision = kernel.process(event)
    print("FINAL DECISION:", decision.decision)

if __name__ == "__main__":
    main()
