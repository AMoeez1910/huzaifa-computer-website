"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, CheckCircle, Upload, X } from "lucide-react";

export default function RepairPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    printerModel: "",
    issue: "",
    additionalInfo: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form data:", formData);
    console.log("Images:", images);
    setSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        printerModel: "",
        issue: "",
        additionalInfo: "",
      });
      setImages([]);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-muted/30 to-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Wrench className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Printer Repair Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert maintenance and repair for all printer brands. Fill out the
            form below and we'll get back to you shortly.
          </p>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">20+</div>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                All Brands
              </div>
              <p className="text-sm text-muted-foreground">
                HP, Canon, Epson & More
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">Fast</div>
              <p className="text-sm text-muted-foreground">
                Quick Turnaround Time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Repair Form */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Request Repair Service</CardTitle>
            <CardDescription>
              Please provide details about your printer issue and we'll contact
              you soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
                <p className="text-muted-foreground">
                  Thank you for contacting us. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                  />
                </div>

                {/* Printer Details */}
                <div className="space-y-2">
                  <Label htmlFor="printerModel">Printer Model *</Label>
                  <Input
                    id="printerModel"
                    name="printerModel"
                    required
                    value={formData.printerModel}
                    onChange={handleInputChange}
                    placeholder="e.g., HP OfficeJet Pro 9015"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue">What's the issue? *</Label>
                  <Textarea
                    id="issue"
                    name="issue"
                    required
                    value={formData.issue}
                    onChange={handleInputChange}
                    placeholder="Please describe the problem with your printer..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Any other details that might help us..."
                    rows={3}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images (Optional)</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload photos of your printer or the issue (Max 5 images)
                  </p>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("images")?.click()}
                      disabled={images.length >= 5}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Choose Images
                    </Button>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="text-sm text-muted-foreground">
                      {images.length} / 5 images
                    </span>
                  </div>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Submit Repair Request
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      window.open("https://wa.me/923009403751", "_blank")
                    }
                  >
                    Contact via WhatsApp
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">
            Prefer to talk directly?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="tel:03009403751">Call: 0300-9403751</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:info@huzaifacomputers.com">
                Email: info@huzaifacomputers.com
              </a>
            </Button>
          </div>
          <p className="text-muted-foreground mt-4">
            Location: Hafeez Centre, Lahore
          </p>
        </div>
      </div>
    </div>
  );
}
