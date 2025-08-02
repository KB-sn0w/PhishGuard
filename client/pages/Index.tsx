import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  AlertTriangle,
  Mail,
  Link as LinkIcon,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Brain,
  Target,
  Users,
  Globe,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

interface PhishingExample {
  id: string;
  type: "email" | "sms" | "social";
  content: string;
  redFlags: string[];
  isPhishing: boolean;
  explanation: string;
}

const phishingExamples: PhishingExample[] = [
  {
    id: "1",
    type: "email",
    content: `From: security@bankoamerica.net
Subject: URGENT: Your account will be suspended!

Dear Customer,

We detected suspicious activity on your account. Click here immediately to verify your identity or your account will be locked within 24 hours.

Verify Now: http://bank-verify-secure.malicious-site.com

Best regards,
Security Team`,
    redFlags: [
      "Misspelled domain (bankoamerica.net vs bankofamerica.com)",
      "Creates urgency and fear",
      "Suspicious link domain",
      "Generic greeting",
      "Threatening language",
    ],
    isPhishing: true,
    explanation:
      "This is a classic phishing email that impersonates a bank to steal credentials.",
  },
  {
    id: "2",
    type: "email",
    content: `From: noreply@microsoft.com
Subject: Security Alert: New Sign-in

Hello,

We noticed a new sign-in to your Microsoft account from:

Location: Seattle, WA
Device: Chrome on Windows
Time: Today at 2:14 PM

If this was you, no action is needed. If not, please secure your account immediately.

Microsoft Account Team`,
    redFlags: [],
    isPhishing: false,
    explanation:
      "This appears to be a legitimate security notification from Microsoft with proper domain and realistic details.",
  },
  {
    id: "3",
    type: "sms",
    content: `URGENT: Your Amazon package delivery failed. Update your address now: https://amzn-delivery-update.com/track/ABC123 or your order will be returned.`,
    redFlags: [
      "Suspicious URL (not amazon.com)",
      "Creates urgency",
      "Unexpected delivery failure",
      "Shortened or suspicious link",
    ],
    isPhishing: true,
    explanation:
      "Fake delivery notification designed to steal personal information.",
  },
];

export default function Index() {
  const [currentExample, setCurrentExample] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    company: "",
    socialMedia: "",
  });
  const [generatedPhishing, setGeneratedPhishing] = useState("");
  const [analysisMode, setAnalysisMode] = useState<"basic" | "advanced">(
    "basic",
  );

  const generatePhishingExample = () => {
    const templates = [
      `Dear ${userInput.name || "[Name]"},

Congratulations! ${userInput.company || "[Company]"} has been selected for our exclusive business partnership program.

Click here to claim your $10,000 signing bonus: [malicious-link]

Best regards,
Partnership Team`,

      `Hi ${userInput.name || "[Name]"},

Someone tried to access your ${userInput.company || "[Company]"} account from ${userInput.email || "[email]"}.

If this wasn't you, secure your account now: [malicious-link]

Security Team`,

      `${userInput.name || "[Name]"},

Your colleague at ${userInput.company || "[Company]"} shared an important document with you.

View Document: [malicious-link]

This link will expire in 24 hours.`,
    ];

    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];
    setGeneratedPhishing(randomTemplate);
  };

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % phishingExamples.length);
    setShowAnswer(false);
  };

  const currentPhishingExample = phishingExamples[currentExample];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PhishGuard</h1>
                <p className="text-sm text-gray-600">
                  Learn to Spot & Stop Phishing Attacks
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link to="/training">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Training
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/quiz">
                  <Brain className="h-4 w-4 mr-2" />
                  Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Master the Art of
              <span className="text-primary"> Phishing Detection</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Learn how cybercriminals exploit personal information to craft
              convincing phishing attacks, and develop the skills to protect
              yourself and your organization.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 text-gray-600">
                <Target className="h-5 w-5 text-primary" />
                <span>Interactive Simulations</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-5 w-5 text-primary" />
                <span>Real-world Examples</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-5 w-5 text-primary" />
                <span>Threat Intelligence</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Learning Modules */}
        <Tabs defaultValue="detect" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="detect" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Detect Phishing
            </TabsTrigger>
            <TabsTrigger value="simulate" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Phishing Simulator
            </TabsTrigger>
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Threat Analysis
            </TabsTrigger>
          </TabsList>

          {/* Detection Training */}
          <TabsContent value="detect">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Phishing Detection Challenge
                  </CardTitle>
                  <CardDescription>
                    Analyze the message below. Is it legitimate or a phishing
                    attempt?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          currentPhishingExample.type === "email"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {currentPhishingExample.type.toUpperCase()}
                      </Badge>
                    </div>
                    <pre className="text-sm whitespace-pre-wrap font-mono bg-white p-3 rounded border">
                      {currentPhishingExample.content}
                    </pre>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant={
                        currentPhishingExample.isPhishing
                          ? "destructive"
                          : "outline"
                      }
                      className="flex-1"
                      onClick={() => setShowAnswer(true)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Phishing
                    </Button>
                    <Button
                      variant={
                        !currentPhishingExample.isPhishing
                          ? "success"
                          : "outline"
                      }
                      className="flex-1"
                      onClick={() => setShowAnswer(true)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Legitimate
                    </Button>
                  </div>

                  {showAnswer && (
                    <Alert
                      className={
                        currentPhishingExample.isPhishing
                          ? "border-red-200 bg-red-50"
                          : "border-green-200 bg-green-50"
                      }
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-3">
                          <p className="font-semibold">
                            {currentPhishingExample.isPhishing
                              ? "🚨 This is PHISHING"
                              : "✅ This is LEGITIMATE"}
                          </p>
                          <p>{currentPhishingExample.explanation}</p>
                          {currentPhishingExample.redFlags.length > 0 && (
                            <div>
                              <p className="font-medium mb-2">
                                Red flags detected:
                              </p>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                {currentPhishingExample.redFlags.map(
                                  (flag, index) => (
                                    <li key={index}>{flag}</li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button onClick={nextExample} className="w-full">
                    Next Example
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Phishing Red Flags Checklist</CardTitle>
                  <CardDescription>
                    Learn the warning signs that indicate a potential phishing
                    attempt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        category: "Sender Issues",
                        items: [
                          "Misspelled domains",
                          "Generic greetings",
                          "Unexpected senders",
                        ],
                      },
                      {
                        category: "Content Issues",
                        items: [
                          "Urgent language",
                          "Grammar mistakes",
                          "Threatening tone",
                        ],
                      },
                      {
                        category: "Link Issues",
                        items: [
                          "Suspicious URLs",
                          "Shortened links",
                          "Mismatched domains",
                        ],
                      },
                      {
                        category: "Request Issues",
                        items: [
                          "Personal info requests",
                          "Password requests",
                          "Immediate action demands",
                        ],
                      },
                    ].map((section, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {section.category}
                        </h4>
                        <ul className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Phishing Simulator */}
          <TabsContent value="simulate">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Personal Information Input
                  </CardTitle>
                  <CardDescription>
                    See how attackers can use your information to create
                    convincing phishing messages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userInput.name}
                        onChange={(e) =>
                          setUserInput((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={userInput.email}
                        onChange={(e) =>
                          setUserInput((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={userInput.company}
                      onChange={(e) =>
                        setUserInput((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="Tech Corp Inc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="social">Social Media Activity</Label>
                    <Textarea
                      id="social"
                      value={userInput.socialMedia}
                      onChange={(e) =>
                        setUserInput((prev) => ({
                          ...prev,
                          socialMedia: e.target.value,
                        }))
                      }
                      placeholder="Recently posted about vacation, new job, etc."
                      rows={3}
                    />
                  </div>
                  <Button onClick={generatePhishingExample} className="w-full">
                    Generate Phishing Example
                  </Button>
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      This information is processed locally and not stored or
                      transmitted anywhere.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Phishing Attack</CardTitle>
                  <CardDescription>
                    This is how an attacker might use your information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedPhishing ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                          {generatedPhishing}
                        </pre>
                      </div>
                      <Alert className="border-amber-200 bg-amber-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Analysis:</strong> This phishing email uses
                          your personal information to appear legitimate. Notice
                          how the attacker leverages your name, company, and
                          context to build trust before directing you to a
                          malicious link.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Protection Tips:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                          <li>Limit personal information shared publicly</li>
                          <li>
                            Verify unexpected communications through official
                            channels
                          </li>
                          <li>Check sender email addresses carefully</li>
                          <li>
                            Hover over links to preview URLs before clicking
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Mail className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>
                        Enter your information and click "Generate" to see a
                        personalized phishing example
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Threat Analysis */}
          <TabsContent value="analyze">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Common Attack Vectors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Email Phishing",
                        percentage: 85,
                        color: "bg-red-500",
                      },
                      {
                        name: "SMS/Text",
                        percentage: 12,
                        color: "bg-orange-500",
                      },
                      {
                        name: "Social Media",
                        percentage: 8,
                        color: "bg-yellow-500",
                      },
                      {
                        name: "Voice Calls",
                        percentage: 5,
                        color: "bg-blue-500",
                      },
                    ].map((vector, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {vector.name}
                          </span>
                          <span className="text-sm text-gray-600">
                            {vector.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${vector.color}`}
                            style={{ width: `${vector.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Target Industries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Financial Services",
                      "Healthcare",
                      "Technology",
                      "Government",
                      "Education",
                      "Retail",
                    ].map((industry, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{industry}</span>
                        <Badge variant="outline">High Risk</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Defense Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { strategy: "Email Authentication", status: "Critical" },
                      { strategy: "User Training", status: "Essential" },
                      { strategy: "Multi-Factor Auth", status: "Required" },
                      { strategy: "Link Protection", status: "Important" },
                      { strategy: "Incident Response", status: "Vital" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <span className="text-sm font-medium">
                          {item.strategy}
                        </span>
                        <Badge className="text-xs">{item.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Advanced Threat Intelligence</CardTitle>
                <CardDescription>
                  Real-time insights into current phishing campaigns and attack
                  trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">
                      Recent Campaign Themes
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Package delivery failures",
                        "Account security alerts",
                        "Software update requirements",
                        "Prize/lottery winnings",
                        "COVID-19 related updates",
                      ].map((theme, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          {theme}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Best Practices</h4>
                    <div className="space-y-2">
                      {[
                        "Verify sender identity independently",
                        "Check URLs before clicking",
                        "Enable 2FA on all accounts",
                        "Keep software updated",
                        "Report suspicious messages",
                      ].map((practice, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {practice}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action Section */}
        <section className="max-w-4xl mx-auto mt-16">
          <Card className="bg-gradient-to-r from-primary/5 to-cyan-50 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Test Your Skills?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Take your cybersecurity knowledge to the next level with our
                  comprehensive training modules and interactive quizzes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/training">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Start Training
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/quiz">
                      <Brain className="h-5 w-5 mr-2" />
                      Take Quiz
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>PhishGuard</strong> - Educational cybersecurity training
              platform
            </p>
            <p className="text-sm">
              This tool is designed for educational purposes to help users
              recognize and prevent phishing attacks.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
