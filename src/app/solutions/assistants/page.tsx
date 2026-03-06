import EnterprisePage from "@/components/EnterprisePage";

export default function Page() {
  return (
    <EnterprisePage
      title="Enterprise AI Assistants"
      subtitle="Deploy intelligent AI agents that operate across your business systems, automate workflows, and provide real-time decision support."
      sections={[
        {
          title: "Autonomous Operations",
          content:
            "AI assistants can execute workflows, update CRM data, process tickets, and coordinate tasks across internal tools without human intervention.",
        },
        {
          title: "Knowledge-Grounded Intelligence",
          content:
            "Assistants are trained on your internal documentation, policies, and databases to provide reliable and contextual responses.",
        },
        {
          title: "Human-in-the-Loop Control",
          content:
            "Critical actions can require approval while routine operations run automatically, ensuring both efficiency and safety.",
        },
        {
          title: "Continuous Learning",
          content:
            "The system improves over time using feedback loops, operational logs, and decision outcomes.",
        },
      ]}
    />
  );
}