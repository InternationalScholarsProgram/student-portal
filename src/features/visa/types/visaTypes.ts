import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "../../../types";
import { AxiosResponse } from "axios";

type Counter = "videos" | "transcripts";
interface CounterModal extends ModalProps {
  updateCounter: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    Counter,
    unknown
  >;
}
export type { Counter, CounterModal };
