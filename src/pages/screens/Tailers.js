import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../css/Tailers.css';

const Tailers = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        experience: '',
        specialization: '',
        location: '',
        contactNumber: '',
        email: '',
        description: '',
        portfolio: null,
        profilePicture: null,
        services: {
            alterations: false,
            customTailoring: false,
            embroidery: false,
            repairWork: false,
            patternMaking: false
        },
        pricingModel: 'hourly',
        hourlyRate: '',
        fixedPrices: {
            alterations: '',
            customShirt: '',
            customPants: '',
            customSuit: ''
        },
        availableDays: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    });
    
    const [previewUrls, setPreviewUrls] = useState({
        portfolio: null,
        profilePicture: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData({
                ...formData,
                [name]: files[0]
            });
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(files[0]);
            setPreviewUrls({
                ...previewUrls,
                [name]: previewUrl
            });
        }
    };

    const handleCheckboxChange = (category, name) => {
        setFormData({
            ...formData,
            [category]: {
                ...formData[category],
                [name]: !formData[category][name]
            }
        });
    };

    const handleNestedChange = (category, name, value) => {
        setFormData({
            ...formData,
            [category]: {
                ...formData[category],
                [name]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        alert('Profile created successfully!');
        // Optionally navigate to another page
        // navigate('/tailor-dashboard');
    };

    return (
        <div className="tailor-profile-container">
            <h1>Create Your Tailor Profile</h1>
            <p>Set up your professional profile to connect with customers</p>
            
            <form onSubmit={handleSubmit} className="tailor-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>
                
                <div className="form-group">
                    <label>Years of Experience</label>
                    <input 
                        type="number" 
                        name="experience" 
                        value={formData.experience} 
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="Years of experience"
                    />
                </div>
                
                <div className="form-group">
                    <label>Specialization</label>
                    <select 
                        name="specialization" 
                        value={formData.specialization} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select your specialization</option>
                        <option value="mens-clothing">Men's Clothing</option>
                        <option value="womens-clothing">Women's Clothing</option>
                        <option value="kids-clothing">Kids' Clothing</option>
                        <option value="formal-wear">Formal Wear</option>
                        <option value="casual-wear">Casual Wear</option>
                        <option value="alterations">Alterations</option>
                        <option value="custom-design">Custom Design</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange}
                        required
                        placeholder="Your city and area"
                    />
                </div>
                
                <div className="form-group">
                    <label>Contact Number</label>
                    <input 
                        type="tel" 
                        name="contactNumber" 
                        value={formData.contactNumber} 
                        onChange={handleChange}
                        required
                        placeholder="Your contact number"
                    />
                </div>
                
                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        required
                        placeholder="Your email address"
                    />
                </div>
                
                <div className="form-group">
                    <label>About You</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange}
                        rows="4"
                        placeholder="Describe your skills, experience, and services offered"
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label>Profile Picture</label>
                    <input 
                        type="file" 
                        name="profilePicture" 
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {previewUrls.profilePicture && (
                        <div className="image-preview">
                            <img src={previewUrls.profilePicture} alt="Profile preview" />
                        </div>
                    )}
                </div>
                
                <div className="form-group">
                    <label>Portfolio Images</label>
                    <input 
                        type="file" 
                        name="portfolio" 
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                    />
                    {previewUrls.portfolio && (
                        <div className="image-preview">
                            <img src={previewUrls.portfolio} alt="Portfolio preview" />
                        </div>
                    )}
                </div>
                
                <div className="form-section">
                    <h3>Services Offered</h3>
                    <div className="checkbox-group">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.services.alterations} 
                                onChange={() => handleCheckboxChange('services', 'alterations')} 
                            />
                            Alterations
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.services.customTailoring} 
                                onChange={() => handleCheckboxChange('services', 'customTailoring')} 
                            />
                            Custom Tailoring
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.services.embroidery} 
                                onChange={() => handleCheckboxChange('services', 'embroidery')} 
                            />
                            Embroidery
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.services.repairWork} 
                                onChange={() => handleCheckboxChange('services', 'repairWork')} 
                            />
                            Repair Work
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.services.patternMaking} 
                                onChange={() => handleCheckboxChange('services', 'patternMaking')} 
                            />
                            Pattern Making
                        </label>
                    </div>
                </div>
                
                <div className="form-section">
                    <h3>Pricing Information</h3>
                    <div className="radio-group">
                        <label>
                            <input 
                                type="radio" 
                                name="pricingModel" 
                                value="hourly" 
                                checked={formData.pricingModel === 'hourly'} 
                                onChange={handleChange} 
                            />
                            Hourly Rate
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="pricingModel" 
                                value="fixed" 
                                checked={formData.pricingModel === 'fixed'} 
                                onChange={handleChange} 
                            />
                            Fixed Prices
                        </label>
                    </div>
                    
                    {formData.pricingModel === 'hourly' ? (
                        <div className="form-group">
                            <label>Hourly Rate ($)</label>
                            <input 
                                type="number" 
                                name="hourlyRate" 
                                value={formData.hourlyRate} 
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                placeholder="Your hourly rate"
                            />
                        </div>
                    ) : (
                        <div className="fixed-prices">
                            <div className="form-group">
                                <label>Alterations ($)</label>
                                <input 
                                    type="number" 
                                    value={formData.fixedPrices.alterations} 
                                    onChange={(e) => handleNestedChange('fixedPrices', 'alterations', e.target.value)}
                                    min="0"
                                    step="0.01"
                                    placeholder="Price for alterations"
                                />
                            </div>
                            <div className="form-group">
                                <label>Custom Shirt ($)</label>
                                <input 
                                    type="number" 
                                    value={formData.fixedPrices.customShirt} 
                                    onChange={(e) => handleNestedChange('fixedPrices', 'customShirt', e.target.value)}
                                    min="0"
                                    step="0.01"
                                    placeholder="Price for custom shirt"
                                />
                            </div>
                            <div className="form-group">
                                <label>Custom Pants ($)</label>
                                <input 
                                    type="number" 
                                    value={formData.fixedPrices.customPants} 
                                    onChange={(e) => handleNestedChange('fixedPrices', 'customPants', e.target.value)}
                                    min="0"
                                    step="0.01"
                                    placeholder="Price for custom pants"
                                />
                            </div>
                            <div className="form-group">
                                <label>Custom Suit ($)</label>
                                <input 
                                    type="number" 
                                    value={formData.fixedPrices.customSuit} 
                                    onChange={(e) => handleNestedChange('fixedPrices', 'customSuit', e.target.value)}
                                    min="0"
                                    step="0.01"
                                    placeholder="Price for custom suit"
                                />
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="form-section">
                    <h3>Availability</h3>
                    <div className="checkbox-group days">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.availableDays.monday} 
                                onChange={() => handleCheckboxChange('availableDays', 'monday')} 
                            />
                            Monday
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.availableDays.tuesday} 
                                onChange={() => handleCheckboxChange('availableDays', 'tuesday')} 
                            />
                            Tuesday
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.availableDays.wednesday} 
                                onChange={() => handleCheckboxChange('availableDays', 'wednesday')} 
                            />
                            Wednesday
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.availableDays.thursday} 
                                onChange={() => handleCheckboxChange('availableDays', 'thursday')} 
                            />
                            Thursday
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.availableDays.friday} 
                                onChange={() => handleCheckboxChange('availableDays', 'friday')} 
                            />
                            Friday
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.availableDays.saturday} 
                                onChange={() => handleCheckboxChange('availableDays', 'saturday')} 
                            />
                            Saturday
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={formData.availableDays.sunday} 
                                onChange={() => handleCheckboxChange('availableDays', 'sunday')} 
                            />
                            Sunday
                        </label>
                    </div>
                </div>
                
                <button type="submit" className="submit-btn">Create Profile</button>
            </form>
        </div>
    );
};

export default Tailers;
