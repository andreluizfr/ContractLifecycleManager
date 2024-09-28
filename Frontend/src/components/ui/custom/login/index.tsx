import React, { useState } from "react";
import { Trans } from "react-i18next";
import { ClipboardList, Inbox, ChartNoAxesCombined , SquarePen, Loader2 } from 'lucide-react';

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



export default function Login() {

  const [loading, setLoading] = useState(false);

  return (
    <div>


        <div>
          <Input type="email" placeholder="E-mail" />
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login com e-mail
          </Button>
        </div>

        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
    </div>
  )
}
