"use client"

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { increment, incrementByAmount, decrement, decrementByAmount, reset } from "@/redux/features/counterSlice";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Counter = () => {
    const dispatch = useAppDispatch();
    const { value } = useAppSelector((state) => state.counter);
    const [step, setStep] = useState<number | undefined>();

    const getStep = (e: any) => {
        const { value: stepValue } = e.currentTarget;
        if (stepValue?.trim() !== '') {
            setStep(!isNaN(Number(stepValue)) ? Number(stepValue) : 0);
        } else {
            setStep(undefined);
        }
    };

    return (
        <section className="flex gap-6">
            <div className="sm:w-1/3">
                <div className="flex gap-1 mb-4">
                    <Button
                        className="text-2xl"
                        onClick={() => {
                            if (step || step === 0) {
                                dispatch(decrementByAmount(step));
                            } else {
                                dispatch(decrement())
                            }
                        }}
                    >
                        -
                    </Button>
                    <Input onChange={getStep} value={`${step ?? ''}`} placeholder="Step" />
                    <Button
                        className="text-2xl"
                        onClick={() => {
                            if (step || step === 0) {
                                dispatch(incrementByAmount(step));
                            } else {
                                dispatch(increment())
                            }
                        }}
                    >
                        +
                    </Button>
                </div>

                <Button
                    className="w-full"
                    onClick={() => {
                        dispatch(reset());
                        setStep(undefined);
                    }}
                >
                    Reset
                </Button>
            </div>
            <div className="flex-1 rounded-lg bg-secondary p-8 text-center text-3xl">
                <pre>{value}</pre>
            </div>
        </section>
    );
};

export default Counter;