"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../ui/FileUploader"


const RegisterForm = ({ user }: { user: User }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
        setIsLoading(true)
        try {
            const userData = {

                name: values.name,
                email: values.email,
                phone: values.phone,
            }

            alert(JSON.stringify(userData, null, 2));
            const user = await createUser(userData)

            if (user) {
                router.push(`patients/${user.$id}/register`)
            }


        } catch (error) {

            console.log(error);

        }

        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more about yourself</p>
                </section>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">

                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="name"
                    label="Full Name"
                    placeholder="Write your name here"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="email"
                        label="Email"
                        placeholder="abc@xyz.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="user"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.PHONE_INPUT}
                        name="phone"
                        label="Phone Number"
                        placeholder="Enter phone number here "
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name="birthDate"
                        label="Date of Birth"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.SKELETON}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => {
                            return <FormControl>
                                <RadioGroup className="h-11 flex gap-6 xl:justify-between"
                                    onValueChange={field.onValueChange}
                                    defaultValue={field.value}>
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <label htmlFor={option} className="cursor-pointer">{option}</label>

                                        </div>
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        }}
                    /> </div>




                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="address"
                        label="Address"
                        placeholder="abc street"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.PHONE_INPUT}
                        name="occupation"
                        label="Occupation"
                        placeholder="Software Engineer"
                    />
                </div>


                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="emergecyContactName"
                        label="Emergency Contact Name"
                        placeholder="Guardian Name"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.PHONE_INPUT}
                        name="emergencyContactNumber"
                        label="Emergency Contact Number"
                        placeholder="Guardian phone Number "
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">

                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                </section>
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SELECT}
                    name="primaryPhysician"
                    label="Primary Physician"
                    placeholder="Select a Physician"
                >
                    {Doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                            <div className="flex cursor-pointer gap-2 items-center">
                                <Image
                                    src={doctor.image}
                                    height={32}
                                    width={32}
                                    alt={doctor.name}
                                    className="rounded-full border border-dark-500"

                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="State Life / Postal Life  etc..."
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="insurancePolicyNumber"
                        label="Insurance Policy Number"
                        placeholder="ABC 1234 "
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="Peanuts, Penicillin, Pollen etc"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="currentMedication"
                        label="Current Medication (if any)"
                        placeholder="Ibuprofen 200mg, Paracitamol 500mg  "
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="familyMedicalHistory"
                        label="Family medical history"
                        placeholder="if any member of the family had any disease in the past"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="pastMedicalHistory"
                        label="Past medical history"
                        placeholder="Appendectomy, Tonsillectomy  "
                    />
                </div>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">

                        <h2 className="sub-header">Identification and Verification</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SELECT}
                    name="identificationType"
                    label="Identification Type"
                    placeholder="Select an identification type"
                >
                    {IdentificationTypes.map((type) => (
                        <SelectItem key={type} value={type} >

                            {type}
                        </SelectItem>
                    ))}
                </CustomFormField>
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="identificatonNumber"
                    label="Identification Number"
                    placeholder="123456678"
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SKELETON}
                    name="identificationDocument"
                    label="Scanned copy of Identification documents"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader
                                files={field.value}
                                onChange={field.onChange} />
                        </FormControl>
                    )}
                />
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">

                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>
                </section>
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.CHECKBOX}
                    name="treatmentConsent"
                    label="Treatment Consent"
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.CHECKBOX}
                    name="disclosourConsent "
                    label="I consent to disclosure of information"
                />
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.CHECKBOX}
                    name="privacyConsent"
                    label="I consent to Privacy of policy "
                />

                <SubmitButton isLoading={isLoading}>
                    Get Started
                </SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm
