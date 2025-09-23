import React, { useRef } from "react";
import { json } from "stream/consumers";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
export default function CheckOut({ cartId }: { cartId: string }) {
  let detailsInput = useRef<HTMLInputElement | null>(null);
  let cityInput = useRef<HTMLInputElement | null>(null);
  let phoneInput = useRef<HTMLInputElement | null>(null);
  async function checkOutSession() {
    const shippingAdress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    };
    console.log(shippingAdress);

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,

      {
        method: "POST",
        body: JSON.stringify({ shippingAdress }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzliMTBjMDM3YjQ5Nzk0Njk5OTlkOCIsIm5hbWUiOiJBaG1lZCBOYXNyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTgwNDg2MTcsImV4cCI6MTc2NTgyNDYxN30.y9-h87AWZelvemTCW18UodfchdgdJq51d7HBaxxWztQ",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    if (data.status == "success") {
      location.href = data.session.url;
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full mt-4 bg-primary text-white hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-black transition"
          >
            Proceed to Checkout
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form>
            <DialogHeader>
              <DialogTitle>Shipping Address</DialogTitle>
              <DialogDescription>
                Enter your shipping information to proceed with checkout.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="details">Address Details</Label>
                <Input
                  id="details"
                  ref={detailsInput}
                  placeholder="e.g. Building 5, Street Name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  ref={cityInput}
                  placeholder="e.g. Cairo"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  ref={phoneInput}
                  placeholder="e.g. 01012345678"
                  required
                  type="tel"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={checkOutSession}
                type="button"
                className="bg-primary cursor-pointer text-white"
              >
                Confirm Order
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
