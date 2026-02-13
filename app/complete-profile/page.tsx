'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { completeProfile } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export default function CompleteProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        role: '',
        rollNo: '',
        division: '',
        department: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (value: string) => {
        setFormData({ ...formData, role: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await completeProfile(formData);
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to complete profile:', error);
            // Handle error (e.g., show toast)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Complete Your Profile
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please provide your details to continue.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Input
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Select onValueChange={handleRoleChange} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {formData.role === 'student' && (
                            <>
                                <div>
                                    <Input
                                        name="rollNo"
                                        placeholder="Roll Number"
                                        value={formData.rollNo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        name="division"
                                        placeholder="Division"
                                        value={formData.division}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div>
                            <Input
                                name="department"
                                placeholder="Department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Complete Profile'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
