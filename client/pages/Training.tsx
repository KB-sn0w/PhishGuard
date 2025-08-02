import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlayCircle, BookOpen, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const trainingModules = [
  {
    id: "email-phishing",
    title: "Email Phishing Detection",
    description:
      "Learn to identify malicious emails and protect your inbox from phishing attempts.",
    duration: "15 min",
    level: "Beginner",
    icon: PlayCircle,
    topics: [
      "Recognizing suspicious senders",
      "Analyzing email headers",
      "Spotting malicious links",
      "Verifying attachments",
    ],
  },
  {
    id: "social-engineering",
    title: "Social Engineering Tactics",
    description:
      "Understand how attackers manipulate psychology to gain unauthorized access.",
    duration: "20 min",
    level: "Intermediate",
    icon: Users,
    topics: [
      "Pretexting techniques",
      "Authority impersonation",
      "Urgency manipulation",
      "Trust exploitation",
    ],
  },
  {
    id: "mobile-threats",
    title: "Mobile Security Threats",
    description:
      "Protect your mobile devices from SMS phishing and malicious apps.",
    duration: "12 min",
    level: "Beginner",
    icon: Target,
    topics: [
      "SMS phishing (smishing)",
      "Malicious app detection",
      "QR code safety",
      "Wi-Fi security",
    ],
  },
  {
    id: "advanced-threats",
    title: "Advanced Persistent Threats",
    description:
      "Deep dive into sophisticated attack methods used by professional hackers.",
    duration: "30 min",
    level: "Advanced",
    icon: BookOpen,
    topics: [
      "Spear phishing campaigns",
      "Business email compromise",
      "Watering hole attacks",
      "Supply chain compromises",
    ],
  },
];

export default function Training() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Training Modules
            </h1>
            <p className="text-xl text-gray-600">
              Interactive courses to enhance your cybersecurity awareness
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {trainingModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card
                  key={module.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {module.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{module.level}</Badge>
                            <span className="text-sm text-gray-500">
                              {module.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">
                      {module.description}
                    </CardDescription>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        What you'll learn:
                      </h4>
                      <ul className="space-y-1">
                        {module.topics.map((topic, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" variant="outline">
                      Start Module
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Learning Path Recommendation</CardTitle>
              <CardDescription>
                Follow this suggested sequence for optimal learning outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {trainingModules.map((module, index) => (
                  <div key={module.id} className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium">
                        {module.title}
                      </span>
                    </div>
                    {index < trainingModules.length - 1 && (
                      <div className="hidden md:block mx-4 flex-1 h-px bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
