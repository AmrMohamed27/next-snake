"use client";

import { ScoreDocument } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toSnakeCase } from "@/lib/utils";

const HighscoresTable = ({ highScores }: { highScores: ScoreDocument[] }) => {
  return (
    <Table className="text-lg">
      <TableCaption>high_scores</TableCaption>
      <TableHeader>
        <TableRow>
          {Object.keys(highScores[0]).map((key) => (
            <TableHead key={key} className="border-r-2 border-theme-gray">
              {toSnakeCase(key)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {highScores.map((score, index) => (
          <TableRow
            key={index}
            className="border-b-2 border-theme-gray *:border-r-2 *:border-theme-gray"
          >
            <TableCell>{toSnakeCase(score.name)}</TableCell>
            <TableCell>{score.score}</TableCell>
            <TableCell>{score.timestamp.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HighscoresTable;
