import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CreateProduct() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    productCode: '',
    brand: '',
    category: '',
    status: 'draft',
    description: '',
    targetMarket: '',
    season: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Add API call to create product
    navigate('/products')
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigate('/products')}
          className="shrink-0"
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text">Create Product</h1>
          <p className="text-sm text-text-muted mt-1">
            Add a new product to your catalog
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Required Fields */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Required fields for product creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-error">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g. Nike Air Max 2024"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            {/* Product Code */}
            <div className="space-y-2">
              <Label htmlFor="productCode">
                Product Code <span className="text-error">*</span>
              </Label>
              <Input
                id="productCode"
                placeholder="e.g. NK-AM-2024"
                value={formData.productCode}
                onChange={(e) => handleChange('productCode', e.target.value)}
                required
              />
            </div>

            {/* Brand & Category - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Brand */}
              <div className="space-y-2">
                <Label htmlFor="brand">
                  Brand <span className="text-error">*</span>
                </Label>
                <Select
                  value={formData.brand}
                  onValueChange={(value) => handleChange('brand', value)}
                  required
                >
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nike">Nike</SelectItem>
                    <SelectItem value="adidas">Adidas</SelectItem>
                    <SelectItem value="puma">Puma</SelectItem>
                    <SelectItem value="reebok">Reebok</SelectItem>
                    <SelectItem value="under-armour">Under Armour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-error">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange('category', value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="apparel">Apparel</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">
                Status <span className="text-error">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange('status', value)}
                required
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Optional Fields */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
            <CardDescription>Optional information to enhance your product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
              />
            </div>

            {/* Target Market & Season - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Target Market */}
              <div className="space-y-2">
                <Label htmlFor="targetMarket">Target Market</Label>
                <Select
                  value={formData.targetMarket}
                  onValueChange={(value) => handleChange('targetMarket', value)}
                >
                  <SelectTrigger id="targetMarket">
                    <SelectValue placeholder="Select target market" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Season */}
              <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <Select
                  value={formData.season}
                  onValueChange={(value) => handleChange('season', value)}
                >
                  <SelectTrigger id="season">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring-2024">Spring 2024</SelectItem>
                    <SelectItem value="summer-2024">Summer 2024</SelectItem>
                    <SelectItem value="fall-2024">Fall 2024</SelectItem>
                    <SelectItem value="winter-2024">Winter 2024</SelectItem>
                    <SelectItem value="spring-2025">Spring 2025</SelectItem>
                    <SelectItem value="summer-2025">Summer 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/products')}
          >
            Cancel
          </Button>
          <Button type="submit">
            <Save size={16} />
            Create Product
          </Button>
        </div>
      </form>
    </div>
  )
}
