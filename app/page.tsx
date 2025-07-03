"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  CalendarIcon,
  DollarSign,
  Star,
  Users,
  Fuel,
  Settings,
  Shield,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  Menu,
  X,
  User,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"

type ViewType = "home" | "search" | "listings" | "booking"

export default function TRTCarRental() {
  const [currentView, setCurrentView] = useState<ViewType>("home")
  const [selectedCar, setSelectedCar] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    carType: "",
    budget: "",
    pickupDate: undefined as Date | undefined,
    dropoffDate: undefined as Date | undefined,
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setUser({ name: "John Doe", email })
    setIsLoggedIn(true)
    setAuthDialogOpen(false)
  }

  const handleSignup = (name: string, email: string, password: string) => {
    // Simulate signup
    setUser({ name, email })
    setIsLoggedIn(true)
    setAuthDialogOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  // Updated cars for Bangladesh middle class with BDT pricing
  const cars = [
    {
      id: 1,
      name: "Toyota Corolla",
      type: "Sedan",
      image: "/images/toyota-corolla.png",
      price: 3500,
      specs: { passengers: 5, fuel: "Petrol", transmission: "Manual" },
      available: true,
      rating: 4.5,
      features: ["AC", "Power Steering", "Central Lock"],
    },
    {
      id: 2,
      name: "Honda City",
      type: "Sedan",
      image: "/images/honda-city.png",
      price: 4000,
      specs: { passengers: 5, fuel: "Petrol", transmission: "Automatic" },
      available: true,
      rating: 4.6,
      features: ["AC", "Alloy Wheels", "Bluetooth"],
    },
    {
      id: 3,
      name: "Suzuki Swift",
      type: "Hatchback",
      image: "/images/suzuki-swift.png",
      price: 2800,
      specs: { passengers: 5, fuel: "Petrol", transmission: "Manual" },
      available: true,
      rating: 4.3,
      features: ["AC", "Power Windows", "Music System"],
    },
    {
      id: 4,
      name: "Nissan Sunny",
      type: "Sedan",
      image: "/placeholder.svg?height=200&width=300",
      price: 3200,
      specs: { passengers: 5, fuel: "Petrol", transmission: "CVT" },
      available: false,
      rating: 4.4,
      features: ["AC", "Reverse Camera", "Keyless Entry"],
    },
    {
      id: 5,
      name: "Hyundai Accent",
      type: "Sedan",
      image: "/placeholder.svg?height=200&width=300",
      price: 3800,
      specs: { passengers: 5, fuel: "Petrol", transmission: "Automatic" },
      available: true,
      rating: 4.5,
      features: ["AC", "Touchscreen", "Safety Airbags"],
    },
    {
      id: 6,
      name: "Mitsubishi Lancer",
      type: "Sedan",
      image: "/placeholder.svg?height=200&width=300",
      price: 4200,
      specs: { passengers: 5, fuel: "Petrol", transmission: "Manual" },
      available: true,
      rating: 4.4,
      features: ["AC", "Sporty Design", "Good Mileage"],
    },
  ]

  const testimonials = [
    {
      name: "Rahim Uddin",
      rating: 5,
      comment: "Excellent service! The car was clean and the price was reasonable.",
      location: "Dhaka",
    },
    {
      name: "Sarah Khan",
      rating: 5,
      comment: "Great booking experience! Very easy to use and reliable service.",
      location: "Chittagong",
    },
    {
      name: "Karim Ahmed",
      rating: 4,
      comment: "Good selection of cars and prompt service. Will use again.",
      location: "Sylhet",
    },
  ]

  const AuthDialog = () => (
    <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-orange-600 flex items-center justify-center gap-2">
            <Image src="/images/trt-logo.png" alt="TRT Logo" width={40} height={40} />
            TRT Car Rental
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                handleLogin(formData.get("email") as string, formData.get("password") as string)
              }}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  Sign In
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                handleSignup(
                  formData.get("name") as string,
                  formData.get("email") as string,
                  formData.get("password") as string,
                )
              }}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input id="signup-name" name="name" placeholder="Enter your full name" required />
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" placeholder="Enter your email" required />
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  Sign Up
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  const Header = () => (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image src="/images/trt-logo.png" alt="TRT Logo" width={32} height={32} className="mr-3" />
            <span className="text-xl font-bold text-gray-900">TRT Car Rental</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button onClick={() => setCurrentView("home")} className="text-gray-700 hover:text-orange-600 font-medium">
              Home
            </button>
            <button
              onClick={() => setCurrentView("search")}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Search Cars
            </button>
            <button
              onClick={() => setCurrentView("listings")}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Our Fleet
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAuthDialogOpen(true)}
                className="border-orange-600 text-orange-600 hover:bg-orange-50"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Button>
            )}

            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setCurrentView("home")
                  setMobileMenuOpen(false)
                }}
                className="text-left text-gray-700 hover:text-orange-600 font-medium px-2 py-1"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentView("search")
                  setMobileMenuOpen(false)
                }}
                className="text-left text-gray-700 hover:text-orange-600 font-medium px-2 py-1"
              >
                Search Cars
              </button>
              <button
                onClick={() => {
                  setCurrentView("listings")
                  setMobileMenuOpen(false)
                }}
                className="text-left text-gray-700 hover:text-orange-600 font-medium px-2 py-1"
              >
                Our Fleet
              </button>
            </div>
          </div>
        )}
      </div>
      <AuthDialog />
    </header>
  )

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Image src="/images/trt-logo.png" alt="TRT Logo" width={60} height={60} className="mr-4" />
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold">Best Car Rental Service in Bangladesh</h1>
                </div>
              </div>
              <p className="text-xl mb-8 text-orange-100">
                Book your car easily and get your preferred vehicle at an affordable price. Reliable service across
                Bangladesh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-4"
                  onClick={() => setCurrentView("search")}
                >
                  Book Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-4 bg-transparent"
                  onClick={() => setCurrentView("listings")}
                >
                  Browse Cars
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/toyota-corolla.png"
                alt="Toyota Corolla - Popular car in Bangladesh"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple and easy car rental process in just three steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-orange-200">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Search & Select</h3>
                <p className="text-gray-600">Browse our fleet and select your preferred car based on your needs</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-orange-200">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Book & Pay</h3>
                <p className="text-gray-600">Fill in your details, choose dates, and complete your booking</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-orange-200">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Pick Up & Drive</h3>
                <p className="text-gray-600">Pick up your car at the scheduled time and enjoy your journey</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Cars Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Car Collection</h2>
            <p className="text-xl text-gray-600">Cars suitable for middle-class families</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {cars.slice(0, 3).map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow border-orange-200">
                <div className="relative">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange-600">{car.type}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {car.specs.passengers}
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      {car.specs.fuel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">৳{car.price}/day</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{car.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setCurrentView("listings")}
              className="px-8 py-3 bg-orange-600 hover:bg-orange-700"
            >
              View All Cars
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Customer Feedback</h2>
            <p className="text-xl text-gray-600">What our customers are saying about our service</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-orange-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )

  const SearchPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Car</h1>
          <p className="text-xl text-gray-600">Search and filter cars based on your preferences</p>
        </div>

        <Card className="p-6 mb-8 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image src="/images/trt-logo.png" alt="TRT Logo" width={24} height={24} />
              Search Cars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="text-base font-medium mb-2 block">
                  Pick-up Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Enter city or area name"
                    className="pl-10 h-12 text-lg"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="carType" className="text-base font-medium mb-2 block">
                  Car Type
                </Label>
                <Select
                  value={searchFilters.carType}
                  onValueChange={(value) => setSearchFilters({ ...searchFilters, carType: value })}
                >
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Choose car type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="microbus">Microbus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-base font-medium mb-2 block">Pick-up Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-lg justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchFilters.pickupDate ? format(searchFilters.pickupDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchFilters.pickupDate}
                      onSelect={(date) => setSearchFilters({ ...searchFilters, pickupDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">Drop-off Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-lg justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchFilters.dropoffDate ? format(searchFilters.dropoffDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchFilters.dropoffDate}
                      onSelect={(date) => setSearchFilters({ ...searchFilters, dropoffDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label htmlFor="budget" className="text-base font-medium mb-2 block">
                Budget (per day)
              </Label>
              <Select
                value={searchFilters.budget}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, budget: value })}
              >
                <SelectTrigger className="h-12 text-lg">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2000">৳0 - ৳2,000</SelectItem>
                  <SelectItem value="2000-3000">৳2,000 - ৳3,000</SelectItem>
                  <SelectItem value="3000-4000">৳3,000 - ৳4,000</SelectItem>
                  <SelectItem value="4000-5000">৳4,000 - ৳5,000</SelectItem>
                  <SelectItem value="5000+">৳5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 h-12 text-lg bg-orange-600 hover:bg-orange-700"
                onClick={() => setCurrentView("listings")}
              >
                Search Cars
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 h-12 text-lg border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                onClick={() => setCurrentView("listings")}
              >
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const ListingsPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Cars</h1>
          <p className="text-xl text-gray-600">Choose from our collection</p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow border-orange-200">
              <div className="relative">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <Badge className={`absolute top-3 right-3 ${car.available ? "bg-green-600" : "bg-red-600"}`}>
                  {car.available ? "Available" : "Unavailable"}
                </Badge>
                <Badge className="absolute top-3 left-3 bg-orange-600">{car.type}</Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">{car.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{car.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{car.specs.passengers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-4 w-4" />
                    <span>{car.specs.fuel}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span>{car.specs.transmission}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {car.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-orange-600">৳{car.price}</span>
                    <span className="text-gray-600">/day</span>
                  </div>

                  <Button
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
                    disabled={!car.available}
                    onClick={() => {
                      if (!isLoggedIn) {
                        setAuthDialogOpen(true)
                        return
                      }
                      setSelectedCar(car)
                      setCurrentView("booking")
                    }}
                  >
                    {car.available ? "Rent Now" : "Unavailable"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const BookingPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complete Your Booking</h1>
          <p className="text-xl text-gray-600">Fill in the details to complete your reservation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image src="/images/trt-logo.png" alt="TRT Logo" width={24} height={24} />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup-location" className="text-base font-medium mb-2 block">
                      Pick-up Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="pickup-location" placeholder="Enter pick-up address" className="pl-10 h-12 text-lg" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dropoff-location" className="text-base font-medium mb-2 block">
                      Drop-off Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="dropoff-location"
                        placeholder="Enter drop-off address"
                        className="pl-10 h-12 text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium mb-2 block">Pick-up Date & Time</Label>
                    <div className="space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-12 text-lg justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Select pick-up date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                      <Input type="time" className="h-12 text-lg" placeholder="Pick-up time" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block">Drop-off Date & Time</Label>
                    <div className="space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-12 text-lg justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Select drop-off date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                      <Input type="time" className="h-12 text-lg" placeholder="Drop-off time" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full-name" className="text-base font-medium mb-2 block">
                        Full Name
                      </Label>
                      <Input
                        id="full-name"
                        placeholder="Enter your full name"
                        className="h-12 text-lg"
                        defaultValue={user?.name || ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base font-medium mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 text-lg"
                        defaultValue={user?.email || ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-base font-medium mb-2 block">
                        Phone Number
                      </Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" className="h-12 text-lg" />
                    </div>

                    <div>
                      <Label htmlFor="license" className="text-base font-medium mb-2 block">
                        Driver's License
                      </Label>
                      <Input id="license" placeholder="Enter license number" className="h-12 text-lg" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1 h-12 text-lg bg-orange-600 hover:bg-orange-700">
                    Confirm Booking
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 h-12 text-lg border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Review Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24 border-orange-200">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCar && (
                  <>
                    <div className="flex items-center gap-3">
                      <Image
                        src={selectedCar.image || "/placeholder.svg"}
                        alt={selectedCar.name}
                        width={60}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold">{selectedCar.name}</p>
                        <p className="text-sm text-gray-600">{selectedCar.type}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Daily Rate</span>
                        <span>৳{selectedCar.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span>3 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>৳{selectedCar.price * 3}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance</span>
                        <span>৳1,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & Fees</span>
                        <span>৳2,000</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>৳{selectedCar.price * 3 + 1500 + 2000}</span>
                    </div>
                  </>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-800">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Protected Booking</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">Free cancellation up to 24 hours before pick-up</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {currentView === "home" && <HomePage />}
      {currentView === "search" && <SearchPage />}
      {currentView === "listings" && <ListingsPage />}
      {currentView === "booking" && <BookingPage />}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/images/trt-logo.png" alt="TRT Logo" width={32} height={32} className="mr-3" />
                <span className="text-xl font-bold">TRT Car Rental</span>
              </div>
              <p className="text-gray-400">
                Bangladesh's best car rental service with reliable vehicles and affordable prices.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => setCurrentView("home")} className="hover:text-white">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("search")} className="hover:text-white">
                    Search Cars
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("listings")} className="hover:text-white">
                    Our Fleet
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+880-1711-123456</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@trtcars.bd</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="text-center text-gray-400">
            <p>&copy; 2024 TRT Car Rental Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
