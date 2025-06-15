import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  subscription: {
    plan: 'free' | 'pro' | 'premium';
    status: 'active' | 'inactive';
    expiresAt?: string;
  };
}

const AccountSettings = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Load user info from localStorage
    const loadUserInfo = () => {
      const userInfoStr = localStorage.getItem("toonifyMe_userInfo");
      if (userInfoStr) {
        try {
          const userData = JSON.parse(userInfoStr);
          setUserInfo(userData);
          setFormData(prev => ({
            ...prev,
            name: userData.name || '',
            email: userData.email || '',
          }));
        } catch (error) {
          console.error("Error parsing user info:", error);
        }
      }
      setIsLoading(false);
    };

    loadUserInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Update user info in localStorage
      const updatedUserInfo = {
        ...userInfo,
        name: formData.name,
        email: formData.email,
      };
      localStorage.setItem("toonifyMe_userInfo", JSON.stringify(updatedUserInfo));
      setUserInfo(updatedUserInfo);

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    try {
      // Here you would typically make an API call to update the password
      // For demo purposes, we'll just show a success message
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case 'free':
        return {
          name: 'Free Plan',
          features: ['Basic avatar generation', 'Standard quality', 'Limited styles'],
          price: '$0/month'
        };
      case 'pro':
        return {
          name: 'Pro Plan',
          features: ['HD avatar generation', 'All styles', 'Priority processing', 'No watermarks'],
          price: '$9.99/month'
        };
      case 'premium':
        return {
          name: 'Premium Plan',
          features: ['4K avatar generation', 'All styles', 'Priority processing', 'No watermarks', 'Custom styles', 'API access'],
          price: '$19.99/month'
        };
      default:
        return {
          name: 'Free Plan',
          features: ['Basic avatar generation', 'Standard quality', 'Limited styles'],
          price: '$0/month'
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="w-12 h-12 rounded-full border-4 border-t-black border-gray-200 animate-spin"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mt-20 sm:mt-16">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 opacity-75 blur"></div>
            <div className="relative rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 sm:mb-4 text-center text-gray-900" style={{letterSpacing: '-0.5px'}}>
                Account Settings
              </h1>

              <Tabs defaultValue="profile" className="mt-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your profile information and password
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <Button type="submit" disabled={isSaving}>
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </form>

                      <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-medium mb-4">Change Password</h3>
                        <form onSubmit={handlePasswordUpdate} className="space-y-4">
                          <div>
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              value={formData.currentPassword}
                              onChange={handleInputChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={formData.newPassword}
                              onChange={handleInputChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="mt-1"
                            />
                          </div>
                          <Button type="submit" disabled={isSaving}>
                            {isSaving ? 'Updating...' : 'Update Password'}
                          </Button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="subscription">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subscription Plan</CardTitle>
                      <CardDescription>
                        Manage your subscription and billing information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-medium">
                                {getPlanDetails(userInfo?.subscription?.plan || 'free').name}
                              </h3>
                              <p className="text-gray-600">
                                {getPlanDetails(userInfo?.subscription?.plan || 'free').price}
                              </p>
                            </div>
                            <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {userInfo?.subscription?.status === 'active' ? 'Active' : 'Inactive'}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {getPlanDetails(userInfo?.subscription?.plan || 'free').features.map((feature, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {userInfo?.subscription?.plan === 'free' ? (
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Upgrade Your Plan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Pro Plan</CardTitle>
                                  <CardDescription>$9.99/month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <Button className="w-full">Upgrade to Pro</Button>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader>
                                  <CardTitle>Premium Plan</CardTitle>
                                  <CardDescription>$19.99/month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <Button className="w-full">Upgrade to Premium</Button>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Manage Subscription</h3>
                            <div className="flex gap-4">
                              <Button variant="outline">Change Plan</Button>
                              <Button variant="destructive">Cancel Subscription</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountSettings; 