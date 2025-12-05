using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wasp.Backend.Data;
using Wasp.Backend.DTOs;
using Wasp.Backend.Models;

namespace Wasp.Backend.Controllers
{
    [ApiController]
    [Route("api/tags")]
    public class TagsController : ControllerBase
    {
        private readonly WaspDbContext _context;

        public TagsController(WaspDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TagDto>>> GetTags()
        {
            var tags = await _context.Tags
                .OrderBy(t => t.Name)
                .ToListAsync();

            var tagDtos = tags.Select(t => new TagDto
            {
                Id = t.Id,
                Name = t.Name,
                CreatedAtUtc = t.CreatedAtUtc ?? DateTime.UtcNow
            }).ToList();

            return Ok(tagDtos);
        }

        [HttpPost]
        public async Task<ActionResult<TagDto>> CreateTag([FromBody] TagDto tagDto)
        {
            var tag = new Tag
            {
                Name = tagDto.Name,
                CreatedAtUtc = DateTime.UtcNow
            };

            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();

            tagDto.Id = tag.Id;
            tagDto.CreatedAtUtc = tag.CreatedAtUtc ?? DateTime.UtcNow;

            return CreatedAtAction(nameof(GetTags), new { id = tag.Id }, tagDto);
        }

        [HttpPost("{itemId:guid}")]
        public async Task<IActionResult> AddTagToItem(Guid itemId, [FromBody] AddTagDto addTagDto)
        {
            var item = await _context.Items.FindAsync(itemId);
            if (item == null)
                return NotFound(new { message = "Item not found" });

            var tag = await _context.Tags.FindAsync(addTagDto.TagId);
            if (tag == null)
                return NotFound(new { message = "Tag not found" });

            var itemTag = await _context.ItemTags
                .FirstOrDefaultAsync(it => it.ItemId == itemId && it.TagId == addTagDto.TagId);

            if (itemTag == null)
            {
                itemTag = new ItemTag
                {
                    ItemId = itemId,
                    TagId = addTagDto.TagId
                };
                _context.ItemTags.Add(itemTag);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        [HttpDelete("{itemId:guid}/{tagId:guid}")]
        public async Task<IActionResult> RemoveTagFromItem(Guid itemId, Guid tagId)
        {
            var itemTag = await _context.ItemTags
                .FirstOrDefaultAsync(it => it.ItemId == itemId && it.TagId == tagId);

            if (itemTag == null)
                return NotFound(new { message = "Tag not found on item" });

            _context.ItemTags.Remove(itemTag);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class AddTagDto
    {
        public Guid TagId { get; set; }
    }
}
